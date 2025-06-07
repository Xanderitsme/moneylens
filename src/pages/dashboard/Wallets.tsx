import { PlusIcon } from '@/core/components/icons/PlusIcon'
import { TrendingDownIcon } from '@/core/components/icons/TrendingDownIcon'
import { TrendingUpIcon } from '@/core/components/icons/TrendingUpIcon'
import { Header } from '@/core/components/sections/Header'
import { ButtonFilled, ButtonFilledTonal, ButtonOutlined } from '@/core/components/ui/Button'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { createWallet } from '@/core/controllers/wallets.controller'
import type { Wallet } from '@/types/wallets'
import { createSignal, For, Match, Switch } from 'solid-js'

interface WalletCartProps {
  name: string
  initialBalance: number
  income: number
  expense: number
}

const WalletCart = ({
  name,
  initialBalance,
  income,
  expense
}: WalletCartProps) => (
  <div class="flex flex-col bg-zinc-900 p-4 rounded-lg min-w-64 cursor-pointer border border-zinc-800 hover:border-primary-300/20">
    <header class="flex justify-between items-center">
      <h3 class="font-semibold">{name}</h3>
    </header>

    <div class="mt-2">
      <p class="text-sm text-zinc-400">Balance</p>
      <p class="font-medium text-lg text-primary-100">
        S/. {(initialBalance + income - expense).toFixed(2)}
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

const generateWalletData = (count: number = 1): Wallet[] =>
  Array.from({ length: count }).map(() => {
    const max = 150
    const min = 50
    const initialBalance = Math.random() * 70 + 10
    const income = Math.random() * max + min
    const expense = Math.max(min, Math.min(income, Math.random() * max + min))

    return {
      created_at: '',
      description: '',
      id: '',
      initial_balance: initialBalance,
      name: 'Personal',
      total_expense: expense,
      total_income: income,
      updated_at: '',
      user_id: ''
    }
  })

const WalletsList = () => {
  const { session } = useAuthContext()
  const [wallets, setWallets] = createSignal<Wallet[]>(generateWalletData(5))
  const [errorMessage, setErrorMessage] = createSignal('')

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

    setWallets((prev) => [data, ...prev])
  }

  // onMount(async () => {
  //   const { data, error } = await getWallets()

  //   if (error != null) {
  //     setErrorMessage(error.message)
  //     return
  //   }

  //   setWallets(data)
  // })

  return (
    <section class="flex flex-col container mx-auto mt-4">
      <Switch>
        <Match when={errorMessage().length > 0}>
          <p class="my-6 mx-auto text-red-400">{errorMessage()}</p>
        </Match>

        <Match when={wallets().length > 0}>
          <div class="flex flex-wrap justify-center gap-4">
            <For each={wallets()}>
              {(wallet) => (
                <WalletCart
                  name={wallet.name}
                  initialBalance={wallet.initial_balance}
                  income={wallet.total_income}
                  expense={wallet.total_expense}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </section>
  )
}

const WalletsPage = () => {
  return (
    <>
      <Header title="Wallets" />
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div class="flex justify-end gap-2">
          <ButtonFilledTonal>
            <PlusIcon class="size-5" />
            <span>Create</span>
          </ButtonFilledTonal>
        </div>

        <WalletsList />
      </main>
    </>
  )
}

export default WalletsPage
