import { Header } from '@/core/components/sections/Header'
import { ButtonCreateWallet } from '@/dashboard/components/ButtonCreateWallet'
import { WalletsList } from '@/dashboard/components/WalletsList'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const queryClient = new QueryClient()

const WalletsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header title="Wallets" />
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div class="flex justify-end gap-2">
          <ButtonCreateWallet />
        </div>

        <WalletsList />
      </main>
    </QueryClientProvider>
  )
}

export default WalletsPage
