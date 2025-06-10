import { getWallets } from '@/core/controllers/wallets.controller'
import { WalletCart } from '@/dashboard/wallets/WalletCard'
import { useQuery } from '@tanstack/solid-query'
import { For, Match, Show, Switch } from 'solid-js'

const Fallback = () => (
  <p class="text-primary-100/60 mt-4 mx-auto">
    You don't have any wallet yet, create one first
  </p>
)

export const WalletsList = () => {
  const query = useQuery(() => ({
    queryKey: ['wallets'],
    queryFn: () => getWallets()
  }))

  return (
    <section class="flex flex-col container mx-auto mt-4">
      <Switch>
        <Match when={query.isPending}>
          <p class="mt-4 mx-auto">Loading...</p>
        </Match>
        <Match when={query.isError || query.data?.error}>
          <p class="mt-4 mx-auto text-red-300">
            Error: {query.error?.message ?? query.data?.error?.message}
          </p>
        </Match>

        <Match when={query.isSuccess}>
          <Show
            when={
              query.data?.data?.length != null && query.data.data.length > 0
            }
            fallback={<Fallback />}
          >
            <div class="flex flex-wrap justify-center gap-4">
              <For each={query.data?.data}>
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
          </Show>
        </Match>
      </Switch>
    </section>
  )
}
