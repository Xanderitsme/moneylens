import { cn } from '@/core/lib/utils'
import { A, type AnchorProps } from '@solidjs/router'

export const Anchor = ({
  class: className,
  children,
  ...props
}: AnchorProps) => (
  <A
    class={cn(
      'underline decoration-2 decoration-primary-300/50 hover:decoration-primary-300 text-primary-200',
      className
    )}
    {...props}
  >
    {children}
  </A>
)
