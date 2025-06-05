import { PlusIcon } from '@/core/components/icons/PlusIcon'
import { TrendingDownIcon } from '@/core/components/icons/TrendingDownIcon'
import { TrendingUpIcon } from '@/core/components/icons/TrendingUpIcon'
import { Header } from '@/core/components/sections/Header'
import { ButtonFilled, ButtonOutlined } from '@/core/components/ui/Button'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import {
  createWallet,
  deleteWallet
} from '@/core/controllers/wallets.controller'
import { createSignal, For, Show } from 'solid-js'

interface WalletCartProps {
  name: string
  balance: number
  income: number
  expense: number
}

const WalletCart = ({ name, balance, income, expense }: WalletCartProps) => (
  <div class="flex flex-col bg-zinc-900 p-4 rounded-lg min-w-64 cursor-pointer border border-zinc-800 hover:border-primary-300/20">
    <header class="flex justify-between items-center">
      <h3 class="font-semibold">{name}</h3>
    </header>

    <div class="mt-2">
      <p class="text-sm text-zinc-400">Balance</p>
      <p class="font-medium text-lg text-primary-100">
        S/. {balance.toFixed(2)}
      </p>
    </div>

    <div class="flex flex-wrap gap-4 mt-4">
      <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="p-1 flex justify-center items-center bg-primary-50/10 rounded-md text-primary-200">
            <TrendingUpIcon class="size-5 inline-block" />
          </span>
          <span class="text-zinc-400">Income</span>
        </div>
        <span class="font-semibold">S/. {income.toFixed(2)}</span>
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="p-1 flex justify-center items-center bg-primary-50/10 rounded-md text-primary-200">
            <TrendingDownIcon class="size-5 inline-block" />
          </span>
          <span class="text-zinc-400">Expense</span>
        </div>
        <span class="font-semibold">S/. {expense.toFixed(2)}</span>
      </div>
    </div>

    <ButtonOutlined class="mt-4">Details</ButtonOutlined>
  </div>
)

const generateWalletData = (count: number = 1) =>
  Array.from({ length: count }).map(() => {
    const max = 15000
    const min = 1000
    const income = Math.random() * max + min
    const expense = Math.max(min, Math.min(income, Math.random() * max + min))
    const balance = income - expense

    return {
      created_at: null,
      current_balance: balance,
      description: null,
      id: '',
      initial_balance: income,
      name: 'Personal',
      updated_at: null,
      user_id: '',
      summary: {
        total_income: income,
        total_expenses: expense
      }
    }
  })

interface Wallet {
  created_at: string | null
  current_balance: number | null
  description: string | null
  id: string
  initial_balance: number | null
  name: string
  updated_at: string | null
  user_id: string
}

interface WalletWithSummary extends Wallet {
  summary: {
    total_income: number
    total_expenses: number
  }
}

const WalletsPage = () => {
  const { session } = useAuthContext()
  const [wallets, setWallets] = createSignal<WalletWithSummary[]>(
    generateWalletData(10)
  )
  const [errorMessage, setErrorMessage] = createSignal('')

  // onMount(async () => {
  //   const { data, error } = await getWallets()

  //   if (error != null) {
  //     setErrorMessage(error.message)
  //     return
  //   }

  //   setWallets(data)
  // })

  const handleCreateWallet = async () => {
    const currentSession = session()

    if (currentSession == null) {
      return
    }

    const { data, error } = await createWallet({
      user_id: currentSession.user.id,
      name: 'Personal budget',
      description: 'My personal budget',
      initial_balance: 500
    })

    if (error != null) {
      console.error(error.message)
      setErrorMessage(error.message)
      return
    }

    setWallets((prev) => [
      {
        ...data,
        summary: {
          total_expenses: 0,
          total_income: data.initial_balance ?? 0
        }
      },
      ...prev
    ])
  }

  const handleDeleteWallet = async () => {
    const res = await deleteWallet({ id: '3' })

    if (res) {
      setErrorMessage(res.error.message)
    }
  }

  return (
    <>
      <Header title="Wallets" />
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <section class="flex flex-col container mx-auto">
          <div class="flex justify-end gap-2">
            <ButtonFilled onClick={handleCreateWallet}>
              <PlusIcon class="size-5" />
              <span>Create</span>
            </ButtonFilled>
            <ButtonFilled onClick={handleDeleteWallet}>
              <span>Delete</span>
            </ButtonFilled>
            <ButtonFilled>
              <span>Fetch</span>
            </ButtonFilled>
          </div>

          {/* <p class="my-6 mx-auto">You don't have any wallet created yet</p> */}
          <Show when={errorMessage().length > 0}>
            <p class="my-6 mx-auto text-red-400">{errorMessage()}</p>
          </Show>

          <div class="flex flex-wrap justify-center gap-4">
            <For each={wallets()}>
              {(wallet) => (
                <WalletCart
                  name={wallet.name}
                  balance={wallet.current_balance ?? 0}
                  income={wallet.summary.total_income}
                  expense={wallet.summary.total_expenses}
                />
              )}
            </For>
          </div>
        </section>
      </main>
    </>
  )
}

export default WalletsPage
