import { PlusIcon } from '@/core/components/icons/PlusIcon'
import { ButtonFilledTonal } from '@/core/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/core/components/ui/Dialog'
import { InputLabel } from '@/core/components/ui/InputLabel'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { createWallet } from '@/core/controllers/wallets.controller'
import { useQueryClient } from '@tanstack/solid-query'
import { createEffect, createSignal, Show } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface CreateWalletForm {
  name: string
  description?: string
  initialBalance?: number
}

export const ButtonCreateWallet = () => {
  const queryClient = useQueryClient()

  const { session } = useAuthContext()
  const [isOpen, setIsOpen] = createSignal(false)
  const [walletData, setWalletData] = createSignal<CreateWalletForm>({
    name: ''
  })
  const [error, setError] = createSignal('')

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (walletData().name == '') {
      setError('Please enter the name of the wallet to recognize it')
      return
    }

    const userSession = session()

    if (userSession == null) {
      setError("Couldn't create the wallet, your session has expired")
      return
    }

    const { user } = userSession

    const { error } = await createWallet({
      user_id: user.id,
      name: walletData().name,
      description: walletData().description,
      initial_balance: walletData().initialBalance
    })

    if (error != null) {
      setError('Unexpected error creating the wallet, please try again')
      return
    }

    setIsOpen(false)

    queryClient.invalidateQueries({ queryKey: ['wallets'] })
  }

  const resetForm = () => {
    setWalletData({ name: '' })
  }

  createEffect(() => {
    if (!isOpen()) {
      resetForm()
    }
  })

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogTrigger as={ButtonFilledTonal}>
        <PlusIcon class="size-5" />
        <span>Create</span>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] bg-zinc-900 border border-zinc-200/20 shadow rounded-lg">
        <DialogHeader>
          <DialogTitle>Create a Wallet</DialogTitle>
          <DialogDescription>
            Enter your wallet details to create one
          </DialogDescription>
        </DialogHeader>
        <form
          class="space-y-4"
          id="create-wallet-form"
          onSubmit={handleSubmitForm}
        >
          <InputLabel
            text="Name"
            placeholder="Bank"
            type="text"
            // required
            value={walletData().name}
            onChange={(e) => {
              setError('')
              setWalletData((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
          <InputLabel
            text="Description"
            placeholder="Wallet for bank transactions"
            type="text"
            value={walletData().description}
            onChange={(e) => {
              setError('')
              setWalletData((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }}
          />
          <InputLabel
            text="Initial balance"
            placeholder="500.00"
            type="number"
            value={walletData().initialBalance}
            onChange={(e) => {
              setError('')
              setWalletData((prev) => ({
                ...prev,
                initialBalance: e.target.value
              }))
            }}
          />
        </form>
        <DialogFooter>
          <div class='class="flex flex-col"'>
            <Show when={error().length > 0}>
              <p class="text-red-400 text-sm my-2">{error()}</p>
            </Show>
            <ButtonFilledTonal
              class="w-fit ml-auto"
              form="create-wallet-form"
              type="submit"
            >
              Save changes
            </ButtonFilledTonal>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
