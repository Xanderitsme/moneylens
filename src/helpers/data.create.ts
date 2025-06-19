import { pickRandom } from '@/core/lib/utils'

export const sleep = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const generateWalletData = (count: number = 1) =>
  Array.from({ length: count }).map(() => {
    const max = 150
    const min = 50
    const initialBalance = Math.random() * 70 + 10
    const income = Math.random() * max + min
    const expense = Math.max(min, Math.min(income, Math.random() * max + min))

    return {
      created_at: '',
      description: '',
      id: crypto.randomUUID(),
      initial_balance: initialBalance,
      name: 'Personal',
      total_expense: expense,
      total_income: income,
      updated_at: '',
      user_id: ''
    }
  })

export const generateCategoriesData = async (
  count: number = 1,
  delay: number
) => {
  if (delay != null) {
    await sleep(delay)
  }

  const types = ['expense', 'income', 'both']

  return Array.from({ length: count }).map(() => {
    const isActive = Math.random() >= 0.5

    return {
      created_at: '',
      deleted_at: null,
      id: crypto.randomUUID(),
      is_active: isActive,
      name: 'Test category',
      type: pickRandom(types) as 'expense' | 'income' | 'both',
      updated_at: '',
      user_id: ''
    }
  })
}
