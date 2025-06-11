import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase'

type Category = Tables<'categories'>

type CreateCategoryType = Method<
  TablesInsert<'categories'>,
  Category,
  GenericError
>

type GetCategoriesType = MethodWithoutArgs<Category[], GenericError>

type UpdateCategoryType = Method<
  {
    id: Category['id']
    update: TablesUpdate<'categories'>
  },
  Category,
  GenericError
>

type DeleteCategoryType = MethodError<{ id: string }, GenericError>
