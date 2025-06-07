import { useAuthContext } from '@/core/context/auth/auth.provider'
import { createWallet } from '@/core/controllers/wallets.controller'
import type { Wallet } from '@/types/wallets'
import { createSignal, For, Match, Switch } from 'solid-js'
import { WalletCart } from '@/dashboard/components/WalletCard'

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

export const WalletsList = () => {
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
