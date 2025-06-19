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
import { InputSelect } from '@/core/components/ui/InputSelect'
import { Label } from '@/core/components/ui/Label'
import { createEffect, createSignal, Show } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface CreateCategoryForm {
  name?: string
  type?: string
}

export const ButtonCreateCategory = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [categoryData, setCategoryData] = createSignal<CreateCategoryForm>({})
  const [error, setError] = createSignal<string>()
  const [currentOption, setCurrentOption] = createSignal<{
    label: string
    value: string
    disabled?: boolean
  }>()

  createEffect(() => {
    setCategoryData((prev) => ({
      ...prev,
      type: currentOption()?.value
    }))
  })

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (categoryData().name == null) {
      setError('Please enter a name')
      return
    }

    if (categoryData().type == null) {
      setError('Please select the type')
      return
    }

    setIsOpen(false)
  }

  const resetForm = () => {
    setCategoryData({})
    setError()
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
      <DialogContent class="max-w-96 bg-zinc-900 border border-zinc-200/20 shadow rounded-lg">
        <DialogHeader>
          <DialogTitle>Create a Category</DialogTitle>
          <DialogDescription>
            Enter your category details to create one
          </DialogDescription>
        </DialogHeader>

        <form
          class="flex flex-col gap-4"
          id="create-category-form"
          onSubmit={handleSubmitForm}
        >
          <InputLabel
            text="Name"
            type="text"
            value={categoryData().name}
            onChange={(e) => {
              setError()
              setCategoryData((prev) => ({ ...prev, name: e.target.value }))
            }}
          />

          <Label text="Type" class="w-fit">
            <InputSelect
              options={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
                { value: 'both', label: 'Both' }
              ]}
              placeholder="Select a type"
              aria-label="Category type"
              value={currentOption()}
              onChange={setCurrentOption}
              hiddenSelect
            />
          </Label>
        </form>

        <DialogFooter>
          <div class="flex flex-nowrap justify-between w-full">
            <Show when={error() != null}>
              <p class="text-red-400 text-sm my-2">{error()}</p>
            </Show>
            <ButtonFilledTonal
              class="w-fit ml-auto shrink-0"
              form="create-category-form"
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
