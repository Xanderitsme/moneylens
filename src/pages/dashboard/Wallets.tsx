import { PlusIcon } from '@/core/components/icons/PlusIcon'
import { Header } from '@/core/components/sections/Header'
import { Anchor } from '@/core/components/ui/Anchor'
import { ButtonPrimary } from '@/core/components/ui/Button'

const WalletsPage = () => {
  return (
    <>
      <Header title="Wallets" />
      <main class="p-2">
        <section class="flex flex-col container mx-auto">
          <div class="flex justify-end w-full">
            <ButtonPrimary>
              <PlusIcon class="size-4" />
              <span>Add Wallet</span>
            </ButtonPrimary>
          </div>

          <p class="my-6 mx-auto">
            You don't have any wallet created yet...{' '}
            <Anchor href="/wallets">Create one NOW</Anchor>
          </p>
        </section>
      </main>
    </>
  )
}

export default WalletsPage
