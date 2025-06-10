import { getTransactions } from '@/core/controllers/transactions.controller'
import { cn } from '@/core/lib/utils'
import type { Transaction } from '@/types/transactions'
import { createSignal, For, onMount } from 'solid-js'

export const TransactionsList = () => {
  const [transactions, setTransactions] = createSignal<Transaction[]>([])

  onMount(async () => {
    const { data, error } = await getTransactions()

    if (error != null) {
      return
    }

    setTransactions(data)
  })

  return (
    <div>
      <ul class="flex flex-col gap-4 max-w-3xl mx-auto">
        <For each={transactions()}>
          {(t) => (
            <li class="flex gap-3 p-2 bg-zinc-900 rounded-lg shadow items-center border border-zinc-800 hover:border-primary-300/20">
              <div class="aspect-square rounded-full bg-zinc-800 size-12"></div>

              <div class="flex flex-col overflow-hidden">
                <span class="text-primary-50 font-medium text-nowrap overflow-hidden text-ellipsis">
                  {t.description}
                </span>

                <span class="font-medium text-zinc-400 text-sm">
                  {new Date(t.transaction_date).toLocaleDateString('es-PE', {
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
                    t.type === 'expense' ? 'text-zinc-400' : 'text-green-200'
                  )}
                >
                  {t.type === 'expense' ? '-' : '+'}S/. {t.amount.toFixed(2)}
                </span>
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}
