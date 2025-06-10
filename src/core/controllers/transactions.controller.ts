import { supabase } from '@/core/services/supabase'
import type {
  CreateTransactionType,
  GetTransactionsType,
  Transaction
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

const generateTransactionsData = (count: number = 1): Transaction[] =>
  Array.from({ length: count }).map(() => {
    const max = 1250
    const min = 50
    const amount = Math.random() * max + min
    const type = Math.random() > 0.5 ? 'expense' : 'income'

    return {
      id: '',
      user_id: '91e341af-c6cc-496c-8d7c-f1e94c4cf5dc',
      wallet_id: 'BCP',
      category_id: 'Food',
      amount,
      type,
      description:
        "This description is really long and shouldn't be a big deal to treat with it, idk man this is just really stupid",
      transaction_date: new Date().toISOString(),
      created_at: '',
      updated_at: ''
    }
  })

export const getTransactions: GetTransactionsType = async () => {
  // const { data, error } = await supabase
  //   .from('transactions')
  //   .select()
  //   .order('transaction_date', { ascending: false })

  // if (error != null) {
  //   return { error: { message: error.message } }
  // }

  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const data = generateTransactionsData(10)

  return { data }
}
