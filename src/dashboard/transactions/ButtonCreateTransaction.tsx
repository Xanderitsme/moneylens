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
import { Input } from '@/core/components/ui/Input'
import { InputLabel } from '@/core/components/ui/InputLabel'
import { InputSelect } from '@/core/components/ui/InputSelect'
import { Label } from '@/core/components/ui/Label'
import { createEffect, createSignal, Show } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface CreateTransactionForm {
  walletId?: string
  categoryId?: string
  type?: string
  description?: string
  amount?: number
  transactionDate?: Date
}

export const ButtonCreateTransaction = () => {
  // const queryClient = useQueryClient()

  // const { session } = useAuthContext()
  const [isOpen, setIsOpen] = createSignal(false)
  const [transactionData, setTransactionData] =
    createSignal<CreateTransactionForm>({})
  const [error, setError] = createSignal('')

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (transactionData().walletId == null) {
      setError('Please select the wallet')
      return
    }

    if (transactionData().type == null) {
      setError('Please select the type')
      return
    }

    if (transactionData().amount == null) {
      setError('Please select the amount')
      return
    }

    setIsOpen(false)
  }

  const resetForm = () => {
    setTransactionData({})
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
          <DialogTitle>Create a Transaction</DialogTitle>
          <DialogDescription>
            Enter your transaction details to create one
          </DialogDescription>
        </DialogHeader>
        <form
          class="flex flex-col gap-4"
          id="create-transaction-form"
          onSubmit={handleSubmitForm}
        >
          <InputLabel
            text="Description"
            type="text"
            value={transactionData().description}
            onChange={(e) => {
              setError('')
              setTransactionData((prev) => ({ ...prev, name: e.target.value }))
            }}
          />

          <Label text="Wallet">
            <InputSelect
              class="w-full"
              options={[
                { value: 'bcp', label: 'BCP' },
                {
                  value: 'caja-arequipa',
                  label: 'Caja Arequipa'
                }
              ]}
              placeholder="Select a wallet"
              aria-label="Transaction type"
            />
          </Label>

          <Label text="Category">
            <InputSelect
              class="w-full"
              options={[
                { value: 'food', label: 'Food' },
                {
                  value: 'transport',
                  label: 'Transporte'
                }
              ]}
              placeholder="Select a category"
              aria-label="Category"
            />
          </Label>

          <div class="flex gap-4 items-stretch">
            <Label text="Type" class="grow">
              <InputSelect
                options={[
                  { value: 'income', label: 'Income' },
                  { value: 'expense', label: 'Expense' }
                ]}
                placeholder="Select a type"
                aria-label="Transaction type"
              />
            </Label>

            <Label text="Date" class="grow">
              <Input type="date" class="w-full h-full" />
            </Label>
          </div>
        </form>
        <DialogFooter>
          <div class='class="flex flex-col"'>
            <Show when={error().length > 0}>
              <p class="text-red-400 text-sm my-2">{error()}</p>
            </Show>
            <ButtonFilledTonal
              class="w-fit ml-auto"
              form="create-transaction-form"
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
