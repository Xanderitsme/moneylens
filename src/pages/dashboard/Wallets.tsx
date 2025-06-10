import { usePageContext } from '@/core/context/page/page.provider'
import { ButtonCreateWallet } from '@/dashboard/wallets/ButtonCreateWallet'
import { WalletsList } from '@/dashboard/wallets/WalletsList'
import { onMount } from 'solid-js'

const WalletsPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Wallets')
  })

  const onChangeWallets = () => {
    // queryClient.invalidateQueries({ queryKey: ['wallets'] })
  }

  return (
    <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
      <div class="flex justify-end gap-2">
        <ButtonCreateWallet onChangeWallets={onChangeWallets} />
      </div>

      <WalletsList />
    </main>
  )
}

export default WalletsPage
