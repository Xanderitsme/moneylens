import { getTransactions } from '@/core/controllers/transactions.controller'
import { cn } from '@/core/lib/utils'
import { useQuery } from '@tanstack/solid-query'
import { For, Match, Show, Switch } from 'solid-js'

const Fallback = () => (
  <p class="text-primary-100/60 mt-4 mx-auto">
    You don't have any transaction yet, create one first
  </p>
)

export const TransactionsList = () => {
  const query = useQuery(() => ({
    queryKey: ['transactions'],
    queryFn: () => getTransactions()
  }))

  return (
    <section class="container mx-auto mt-4">
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
            <ul class="flex flex-col gap-2 sm:gap-4 max-w-3xl mx-auto">
              <For each={query.data?.data}>
                {(t) => (
                  <li class="flex gap-3 p-2 bg-zinc-900 rounded-lg shadow items-center border border-zinc-800 hover:border-primary-300/20">
                    <div class="flex flex-col justify-center gap-1 aspect-square shrink-0 w-20 overflow-hidden">
                      <span class="mx-auto rounded-full bg-primary-200/20 aspect-square shrink-0 size-12 flex justify-center items-center uppercase select-none">
                        {t.category_id[0]}
                      </span>
                      <span class="text-center text-sm overflow-hidden text-ellipsis text-nowrap">
                        {t.category_id}
                      </span>
                    </div>

                    <div class="flex flex-col overflow-hidden">
                      <Show when={t.description != null}>
                        <span class="text-primary-50 font-medium text-nowrap overflow-hidden text-ellipsis">
                          {t.description}
                        </span>
                      </Show>

                      <span class="font-medium text-zinc-400 text-sm">
                        {new Date(
                          new Date(t.transaction_date).getTime() +
                            1000 * 60 * 60 * 5
                        ).toLocaleDateString('es-PE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>

                      <span class="text-zinc-400 text-sm">{t.wallet_id}</span>
                    </div>

                    <div class="flex items-center ml-auto px-2">
                      <span
                        class={cn(
                          'font-semibold text-nowrap',
                          t.type === 'expense'
                            ? 'text-zinc-400'
                            : 'text-green-200'
                        )}
                      >
                        {t.type === 'expense' ? '-' : '+'}S/.{' '}
                        {t.amount.toFixed(2)}
                      </span>
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </Match>
      </Switch>
    </section>
  )
}
