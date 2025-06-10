import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/core/components/ui/Select'
import { cn } from '@/core/lib/utils'
import type { SelectBaseItemComponentProps } from '@kobalte/core/src/select/select-base.jsx'
import type { JSX } from 'solid-js/jsx-runtime'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  options: SelectOption[]
  class?: string
  placeholder?: JSX.Element
  value?: SelectOption
  onChange?: (value: SelectOption | null) => void
  'aria-label'?: string
}

export const InputSelect = ({
  options,
  class: className,
  placeholder,
  value,
  onChange,
  'aria-label': ariaLabel
}: Props) => (
  <Select
    options={options}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    optionValue="value"
    optionTextValue="label"
    optionDisabled="disabled"
    itemComponent={(props: SelectBaseItemComponentProps<SelectOption>) => (
      <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
    )}
  >
    <SelectTrigger aria-label={ariaLabel} class={cn('w-48', className)}>
      <SelectValue<SelectOption>>
        {(state) => state.selectedOption().label}
      </SelectValue>
    </SelectTrigger>
    <SelectContent />
  </Select>
)
