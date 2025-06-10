import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase'

type Transaction = Tables<'transactions'>

type CreateTransactionType = Method<
  TablesInsert<'transactions'>,
  Transaction,
  {
    message: string
  }
>

type GetTransactionByIdType = Method<
  {
    id: Transaction['id']
  },
  Transaction,
  GenericError
>

type GetTransactionsType = MethodWithoutArgs<Transaction[], GenericError>

type UpdateTransactionType = Method<
  {
    id: Transaction['id']
    update: TablesUpdate<'transactions'>
  },
  Transaction,
  GenericError
>

type DeleteTransactionType = MethodError<{ id: string }, GenericError>
