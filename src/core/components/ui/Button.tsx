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
      'px-3 py-2 bg-white text-primary-950 text-sm rounded-md font-medium cursor-pointer',
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

export const ButtonFilled = ({
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
      'flex gap-1 justify-center items-center cursor-pointer',
      'px-3 py-2.5 bg-primary-900 text-primary-50 text-sm rounded-md font-medium',
      'not-disabled:hover:bg-primary-800 not-disabled:active:bg-primary-800',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-current',
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

export const ButtonFilledTonal = ({
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
      'flex gap-1 justify-center items-center cursor-pointer',
      'px-3 py-2.5 bg-primary-50 text-primary-950 text-sm rounded-md font-medium',
      'not-disabled:hover:bg-white not-disabled:active:bg-white',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white',
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

export const ButtonOutlined = ({
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
      'flex gap-1 justify-center items-center cursor-pointer',
      'px-3 py-2.5 text-zinc-200 border border-current/30 text-sm rounded-md font-medium',
      'not-disabled:hover:text-primary-100 not-disabled:hover:bg-primary-200/5 not-disabled:active:text-primary-100 not-disabled:active:bg-primary-200/5',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-current',
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

export const ButtonText = ({
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
      'flex gap-1 justify-center items-center cursor-pointer',
      'px-3 py-2.5 text-zinc-200 text-sm rounded-md font-medium',
      'not-disabled:hover:text-primary-100 not-disabled:hover:bg-primary-200/5 not-disabled:active:text-primary-100 not-disabled:active:bg-primary-200/5',
      'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-current',
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
