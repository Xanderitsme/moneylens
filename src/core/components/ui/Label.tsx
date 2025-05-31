import { cn } from '@/core/lib/utils'
import type { JSX } from 'solid-js/jsx-runtime'

export const Label = ({
  class: className,
  ...props
}: JSX.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      data-slot="label"
      class={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
