import { getCategories } from '@/core/controllers/categories.controller'
import { useQuery } from '@tanstack/solid-query'
import { For, Match, Show, Switch } from 'solid-js'

const Fallback = () => (
  <p class="text-primary-100/60 mt-4 mx-auto">
    You don't have any category yet, create one first
  </p>
)

export const CategoriesList = () => {
  const query = useQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  }))

  return (
    <section class="container mx-auto">
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
                {(c) => (
                  <div class="flex flex-col items-center p-4 border border-white/10 rounded-lg">
                    <span class="rounded-full bg-primary-200/20 aspect-square shrink-0 size-12 flex justify-center items-center uppercase select-none">
                      {c.name[0]}
                    </span>
                    <span class="font-medium mt-2">{c.name}</span>
                    <span class="text-sm text-zinc-400">
                      <Switch fallback={'Income and Expenses'}>
                        <Match when={c.type === 'income'}>Income</Match>
                        <Match when={c.type === 'expense'}>Expense</Match>
                      </Switch>
                    </span>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Match>
      </Switch>
    </section>
  )
}
