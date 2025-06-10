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
