import { cn } from '@/core/lib/utils'
import type { JSX } from 'solid-js/jsx-runtime'

export const Button = ({
  class: className,
  ...props
}: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    class={cn(
      'px-3 py-2 bg-white text-primary-950 hover:bg-primary-50 text-sm rounded font-medium',
      className
    )}
    {...props}
  >
    {props.children}
  </button>
)

export const IconButton = ({
  class: className,
  ...props
}: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    class={cn(
      'rounded-md p-1.5 hover:bg-primary-200/15 outline-none focus-visible:ring-2 ring-primary-200/30',
      className
    )}
    {...props}
  >
    {props.children}
  </button>
)
