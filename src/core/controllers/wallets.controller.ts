import { supabase } from '@/core/services/supabase'

type CreateWalletType = Method<
  {
    user_id: string
    name: string
    description?: string | null
    initial_balance?: number | null
    current_balance?: number | null
  },
  {
    created_at: string | null
    current_balance: number | null
    description: string | null
    id: number
    initial_balance: number | null
    name: string
    updated_at: string | null
    user_id: string
  },
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

type DeleteWalletType = MethodError<{ id: number }, { message: string }>

export const deleteWallet: DeleteWalletType = async ({ id }) => {
  const { error } = await supabase.from('wallets').delete().eq('id', id)

  if (error) {
    return { error: { message: error.message } }
  }
}
