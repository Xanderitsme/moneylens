import type { JSX } from 'solid-js/jsx-runtime'
import { Input } from '@/core/components/ui/Input'
import { Label } from '@/core/components/ui/Label'
import { Show } from 'solid-js'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>
}

export const InputLabel = ({ text, labelProps, ...props }: Props) => {
  return (
    <Label class="w-full max-w-sm flex-col" {...labelProps}>
      <Show when={text != null}>
        <p class="text-sm self-start">{text}</p>
      </Show>
      <Input {...props} />
    </Label>
  )
}
