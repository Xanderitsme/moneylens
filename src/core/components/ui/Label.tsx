import { cn } from '@/core/lib/utils'
import { Show } from 'solid-js'
import type { JSX } from 'solid-js/jsx-runtime'

interface Props extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  text?: string
  error?: string
}

export const Label = ({
  children,
  class: className,
  text,
  error,
  ...props
}: Props) => {
  return (
    <label
      data-slot="label"
      class={cn(
        'flex flex-col justify-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Show when={text != null}>
        <span class="text-zinc-300 text-sm self-start">{text}</span>
      </Show>

      {children}
      <Show when={error != null}>
        <span class="text-red-400 text-sm">{error}</span>
      </Show>
    </label>
  )
}
