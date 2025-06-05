import { supabase } from '@/core/services/supabase'
import type {
  CreateWalletType,
  DeleteWalletType,
  GetWalletByIdType,
  GetWalletsType,
  WalletWithSummary
} from '@/types/wallets'

export const createWallet: CreateWalletType = async ({
  user_id,
  name,
  description,
  initial_balance,
  current_balance
}) => {
  const { data, error } = await supabase
    .from('wallets')
    .insert({
      user_id,
      name,
      description,
      initial_balance,
      current_balance
    })
    .select()

  if (error) {
    return { error: { message: error.message } }
  }

  return {
    data: data[0]
  }
}

export const getWallets: GetWalletsType = async () => {
  const { data: wallets, error } = await supabase.from('wallets').select(`
      *,
      transactions:transactions(
        type,
        amount
      )
    `)

  if (error) {
    return { error: { message: error.message } }
  }

  const walletsWithSummary: WalletWithSummary[] = wallets.map((wallet) => {
    const transactions = wallet.transactions

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.total_income += transaction.amount
        } else {
          acc.total_expenses += transaction.amount
        }
        return acc
      },
      { total_income: 0, total_expenses: 0 }
    )

    const { transactions: _, ...walletWithoutTransactions } = wallet

    return {
      ...walletWithoutTransactions,
      summary
    }
  })

  return {
    data: walletsWithSummary
  }
}

export const getWalletById: GetWalletByIdType = async ({ id }) => {
  const { data, error } = await supabase.from('wallets').select().eq('id', id)

  if (error != null) {
    return { error: { message: error.message } }
  }

  return {
    data: {
      ...data[0],
      summary: {
        total_income: 0,
        total_expenses: 0
      }
    }
  }
}

export const deleteWallet: DeleteWalletType = async ({ id }) => {
  const { error } = await supabase.from('wallets').delete().eq('id', id)

  if (error) {
    return { error: { message: error.message } }
  }
}
