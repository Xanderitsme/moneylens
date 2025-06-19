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

const types = ['expense', 'income', 'both']

export const generateCategoriesData = async (
  count: number = 1,
  delay?: number
) => {
  if (delay != null) {
    await sleep(delay)
  }

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

export const generateTransactionsData = async (
  count: number = 1,
  delay?: number
) => {
  if (delay != null) {
    await sleep(delay)
  }

  return Array.from({ length: count }).map(() => {
    const max = 3250
    const min = 5
    const amount = Math.random() * max + min
    const type = (Math.random() > 0.5 ? 'expense' : 'income') as
      | 'expense'
      | 'income'

    return {
      id: '',
      user_id: '91e341af-c6cc-496c-8d7c-f1e94c4cf5dc',
      wallet_id: 'Efectivo',
      category_id: 'Food',
      amount,
      type,
      description:
        "This description is really long and shouldn't be a big deal to treat with it, idk man this is just really stupid",
      transaction_date: new Date().toISOString(),
      created_at: '',
      updated_at: ''
    }
  })
}
