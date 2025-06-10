import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase'

type Wallet = Tables<'wallets'>

type CreateWalletType = Method<
  TablesInsert<'wallets'>,
  Wallet,
  {
    message: string
  }
>

type GetWalletByIdType = Method<
  {
    id: Wallet['id']
  },
  Wallet,
  GenericError
>

type GetWalletsType = MethodWithoutArgs<Wallet[], GenericError>

type UpdateWalletType = Method<
  {
    id: Wallet['id']
    update: TablesUpdate<'wallets'>
  },
  Wallet,
  GenericError
>

type DeleteWalletType = MethodError<{ id: string }, GenericError>
