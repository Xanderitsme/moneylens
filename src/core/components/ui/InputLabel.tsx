import type { JSX } from 'solid-js/jsx-runtime'
import { Input } from '@/core/components/ui/Input'
import { Label } from '@/core/components/ui/Label'
import { Show } from 'solid-js'
import { cn } from '@/core/lib/utils'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  error?: string
  labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>
}

export const InputLabel = ({ text, error, labelProps, ...props }: Props) => {
  const { class: className, ...lbProps } = labelProps ?? {}

  return (
    <Label class={cn('w-full max-w-sm flex-col', className)} {...lbProps}>
      <Show when={text != null}>
        <p class="text-sm self-start">{text}</p>
      </Show>
      <Input {...props} />
      <Show when={error != null}>
        <p class="text-red-400 text-sm">{error}</p>
      </Show>
    </Label>
  )
}
