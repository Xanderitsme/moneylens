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
  WalletWithSummary,
  GenericError
>

type GetWalletsType = MethodWithoutArgs<WalletWithSummary[], GenericError>

type UpdateWalletType = Method<
  {
    id: Wallet['id']
    update: TablesUpdate<'wallets'>
  },
  Wallet,
  GenericError
>

type DeleteWalletType = MethodError<{ id: string }, GenericError>
