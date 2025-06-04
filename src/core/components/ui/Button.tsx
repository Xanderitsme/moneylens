import { cn } from '@/core/lib/utils'
import type { JSX } from 'solid-js/jsx-runtime'

export const Button = ({
  class: className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}: JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  'aria-label'?: string
  'aria-describedby'?: string
}) => (
  <button
    class={cn(
      'flex gap-2 justify-center items-center',
      'px-3 py-2 bg-white text-primary-950 text-sm rounded font-medium cursor-pointer',
      'hover:bg-primary-50 active:bg-primary-50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    {...props}
  >
    {props.children}
  </button>
)

export const IconButton = ({
  class: className,
  'aria-label': ariaLabel,
  ...props
}: JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  'aria-label': string
}) => (
  <button
    class={cn(
      'rounded-md p-1.5 hover:bg-primary-200/15 outline-none cursor-pointer',
      'focus-visible:ring-2 ring-primary-200/30',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    aria-label={ariaLabel}
    {...props}
  >
    {props.children}
  </button>
)
