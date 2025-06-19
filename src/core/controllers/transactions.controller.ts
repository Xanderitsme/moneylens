import { supabase } from '@/core/services/supabase'
import type {
  CreateTransactionType,
  GetTransactionsType
} from '@/types/transactions'

export const createTransaction: CreateTransactionType = async ({
  user_id,
  wallet_id,
  category_id,
  amount,
  type,
  description,
  transaction_date
}) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id,
      wallet_id,
      category_id,
      amount,
      type,
      description,
      transaction_date
    })
    .select()

  if (error) {
    return { error: { message: error.message } }
  }

  return {
    data: data[0]
  }
}

export const getTransactions: GetTransactionsType = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select()
    .order('transaction_date', { ascending: false })

  if (error != null) {
    return { error: { message: error.message } }
  }

  return { data }
}
