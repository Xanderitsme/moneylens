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

export const getWallets: GetWalletsType = async () => {
  const { data: wallets, error } = await supabase.from('wallets').select()

  if (error) {
    return { error: { message: error.message } }
  }

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
