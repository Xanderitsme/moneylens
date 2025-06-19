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
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { getCategories } from '@/core/controllers/categories.controller'
import { createTransaction } from '@/core/controllers/transactions.controller'
import { getWallets } from '@/core/controllers/wallets.controller'
import { useQuery, useQueryClient } from '@tanstack/solid-query'
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
  const queryClient = useQueryClient()
  const { session } = useAuthContext()

  const [isOpen, setIsOpen] = createSignal(false)
  const [transactionData, setTransactionData] =
    createSignal<CreateTransactionForm>({})
  const [error, setError] = createSignal<string>()

  const queryWallets = useQuery(() => ({
    queryKey: ['wallets'],
    queryFn: () => getWallets()
  }))

  const queryCategories = useQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  }))

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    const { walletId, categoryId, amount, type, description, transactionDate } =
      transactionData()

    if (amount == null) {
      setError('Please enter the amount')
      return
    }

    if (walletId == null) {
      setError('Please select the wallet')
      return
    }

    if (type == null) {
      setError('Please select the type')
      return
    }

    if (type != null && type != 'income' && type != 'expense') {
      setError('Invalid type')
      return
    }

    if (categoryId == null) {
      setError('Please select the category')
      return
    }

    const userSession = session()

    if (userSession == null) {
      setError("Couldn't create the wallet, your session has expired")
      return
    }

    const { user } = userSession

    const { error } = await createTransaction({
      user_id: user.id,
      wallet_id: walletId,
      category_id: categoryId,
      amount,
      type,
      description,
      transaction_date: (transactionDate ?? new Date()).toISOString()
    })

    if (error != null) {
      setError('Unexpected error creating the transaction, please try again')
      return
    }

    setIsOpen(false)

    queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const [currentWallet, setCurrentWallet] = createSignal<{
    label: string
    value: string
    disabled?: boolean
  }>()

  createEffect(() => {
    setTransactionData((prev) => {
      setError()

      return {
        ...prev,
        walletId: currentWallet()?.value
      }
    })
  })

  const [currentType, setCurrentType] = createSignal<{
    label: string
    value: string
    disabled?: boolean
  }>()

  createEffect(() => {
    setTransactionData((prev) => {
      setError()

      return {
        ...prev,
        type: currentType()?.value
      }
    })
  })

  const [currentCategory, setCurrentCategory] = createSignal<{
    label: string
    value: string
    disabled?: boolean
  }>()

  createEffect(() => {
    setTransactionData((prev) => {
      setError()

      return {
        ...prev,
        categoryId: currentCategory()?.value
      }
    })
  })

  const resetForm = () => {
    setTransactionData({})
    setError()
    setCurrentWallet()
    setCurrentType()
    setCurrentCategory()
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
            text="Amount"
            type="number"
            value={transactionData().amount}
            onChange={(e) => {
              setError()
              setTransactionData((prev) => ({
                ...prev,
                amount: parseFloat(e.target.value)
              }))
            }}
          />

          <InputLabel
            text="Description"
            type="text"
            value={transactionData().description}
            onChange={(e) => {
              setError()
              setTransactionData((prev) => ({ ...prev, name: e.target.value }))
            }}
          />

          <Label text="Wallet">
            <InputSelect
              class="w-full"
              options={
                queryWallets.data?.data?.map((w) => ({
                  label: w.name,
                  value: w.id
                })) ?? []
              }
              placeholder="Select a wallet"
              aria-label="Transaction wallet"
              value={currentWallet()}
              onChange={setCurrentWallet}
              hiddenSelect
            />
          </Label>

          <Label text="Type">
            <InputSelect
              class="w-full"
              options={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' }
              ]}
              placeholder="Select a type"
              aria-label="Transaction type"
              value={currentType()}
              onChange={setCurrentType}
            />
          </Label>

          <div class="flex gap-4 items-stretch">
            <Label text="Category" class="grow">
              <InputSelect
                class="w-full"
                options={
                  queryCategories.data?.data?.map((c) => ({
                    label: c.name,
                    value: c.id
                  })) ?? []
                }
                placeholder="Select a category"
                aria-label="Category"
                value={currentCategory()}
                onChange={setCurrentCategory}
              />
            </Label>

            <Label text="Date" class="grow">
              <Input type="date" class="w-full h-full" />
            </Label>
          </div>
        </form>

        <DialogFooter>
          <div class='class="flex flex-col"'>
            <Show when={error() != null}>
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
