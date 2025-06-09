import { supabase } from '@/core/services/supabase'
import type {
  CreateWalletType,
  DeleteWalletType,
  GetWalletByIdType,
  GetWalletsType,
  UpdateWalletType
} from '@/types/wallets'

export const createWallet: CreateWalletType = async ({
  user_id,
  name,
  description,
  initial_balance
}) => {
  const { data, error } = await supabase
    .from('wallets')
    .insert({
      user_id,
      name,
      description,
      initial_balance
    })
    .select()

  if (error) {
    return { error: { message: error.message } }
  }

  return {
    data: data[0]
  }
}

const generateWalletData = (count: number = 1) =>
  Array.from({ length: count }).map(() => {
    const max = 150
    const min = 50
    const initialBalance = Math.random() * 70 + 10
    const income = Math.random() * max + min
    const expense = Math.max(min, Math.min(income, Math.random() * max + min))

    return {
      created_at: '',
      description: '',
      id: '',
      initial_balance: initialBalance,
      name: 'Personal',
      total_expense: expense,
      total_income: income,
      updated_at: '',
      user_id: ''
    }
  })

export const getWallets: GetWalletsType = async () => {
  // const { data: wallets, error } = await supabase.from('wallets').select()

  // if (error) {
  //   return { error: { message: error.message } }
  // }

  await new Promise((resolve) => setTimeout(resolve, 2000))
  const wallets = generateWalletData(10)

  return {
    data: wallets
  }
}

export const getWalletById: GetWalletByIdType = async ({ id }) => {
  const { data, error } = await supabase.from('wallets').select().eq('id', id)

  if (error != null) {
    return { error: { message: error.message } }
  }

  return {
    data: data[0]
  }
}

export const updateWallet: UpdateWalletType = async ({ id, update }) => {
  const { data: wallets, error } = await supabase
    .from('wallets')
    .update({
      ...update
    })
    .eq('id', id)
    .select()

  if (error != null) {
    return { error: { message: error.message } }
  }

  return {
    data: wallets[0]
  }
}

export const deleteWallet: DeleteWalletType = async ({ id }) => {
  const { error } = await supabase.from('wallets').delete().eq('id', id)

  if (error) {
    return { error: { message: error.message } }
  }
}
