import { PlusIcon } from '@/core/components/icons/PlusIcon'
import { Header } from '@/core/components/sections/Header'
import { ButtonFilledTonal } from '@/core/components/ui/Button'
import { WalletsList } from '@/dashboard/components/WalletsList'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const queryClient = new QueryClient()

const WalletsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default WalletsPage
