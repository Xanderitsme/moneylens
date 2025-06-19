import { supabase } from '@/core/services/supabase'
import type {
  CreateCategoryType,
  DeleteCategoryType,
  GetCategoriesType,
  UpdateCategoryType
} from '@/types/categories'

export const createCategory: CreateCategoryType = async ({
  user_id,
  name,
  type
}) => {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      user_id,
      name,
      type
    })
    .select()

  if (error) {
    return { error: { message: error.message } }
  }

  return {
    data: data[0]
  }
}

export const getCategories: GetCategoriesType = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select()
    .order('name')

  if (error) {
    return { error: { message: error.message } }
  }

  return {
    data: data
  }
}

export const updateCategory: UpdateCategoryType = async ({ id, update }) => {
  const { data: wallets, error } = await supabase
    .from('categories')
    .update({
      name: update.name,
      type: update.type,
      is_active: update.is_active
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

export const deleteCategory: DeleteCategoryType = async ({ id }) => {
  const { error } = await supabase.from('categories').delete().eq('id', id)

  if (error) {
    return { error: { message: error.message } }
  }
}
