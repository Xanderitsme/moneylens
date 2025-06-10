import type { JSX } from 'solid-js/jsx-runtime'
import { Input } from '@/core/components/ui/Input'
import { Label } from '@/core/components/ui/Label'
import { cn } from '@/core/lib/utils'

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  text?: string
  error?: string
  labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>
}

export const InputLabel = ({ text, error, labelProps, ...props }: Props) => {
  const { class: className, ...lbProps } = labelProps ?? {}

  return (
    <Label
      class={cn('w-full max-w-sm flex-col', className)}
      text={text}
      error={error}
      {...lbProps}
    >
      <Input {...props} />
    </Label>
  )
}
