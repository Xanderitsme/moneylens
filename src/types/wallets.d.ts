import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase'

type Wallet = Tables<'wallets'>

type CreateWalletType = Method<
  TablesInsert<'wallets'>,
  Wallet,
  {
    message: string
  }
>

interface WalletWithSummary extends Wallet {
  summary: {
    total_income: number
    total_expenses: number
  }
}

type GetWalletByIdType = Method<
  {
    id: Wallet['id']
  },
  WalletWithSummary,
  GenericError
>

type GetWalletsType = MethodWithoutArgs<WalletWithSummary[], GenericError>

type UpdateWalletType = Method<TablesUpdate<'wallets'>, Wallet, GenericError>

type DeleteWalletType = MethodError<{ id: string }, GenericError>
