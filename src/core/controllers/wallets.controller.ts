import { supabase } from '@/core/services/supabase'
import type { TablesInsert, Tables } from '@/types/supabase'

type CreateWalletType = Method<
  TablesInsert<'wallets'>,
  Tables<'wallets'>,
  {
    message: string
  }
>

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

type DeleteWalletType = MethodError<{ id: string }, { message: string }>

export const deleteWallet: DeleteWalletType = async ({ id }) => {
  const { error } = await supabase.from('wallets').delete().eq('id', id)

  if (error) {
    return { error: { message: error.message } }
  }
}

interface Wallet {
  id: string
  user_id: string
  name: string
  created_at: string | null
  current_balance: number | null
  description: string | null
  initial_balance: number | null
  updated_at: string | null
}

interface WalletWithSummary extends Wallet {
  summary: {
    total_income: number
    total_expenses: number
  }
}

type GetWalletsType = MethodWithoutArgs<
  WalletWithSummary[],
  {
    message: string
  }
>

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
