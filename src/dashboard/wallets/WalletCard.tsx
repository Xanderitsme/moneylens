import { TrendingDownIcon } from '@/core/components/icons/TrendingDownIcon'
import { TrendingUpIcon } from '@/core/components/icons/TrendingUpIcon'
import { ButtonOutlined } from '@/core/components/ui/Button'

interface WalletCartProps {
  name: string
  initialBalance: number
  income: number
  expense: number
}

export const WalletCart = ({
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
