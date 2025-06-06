import { ChevronsUpDownIcon } from '@/core/components/icons/ChevronsUpDownIcon'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { cn } from '@/core/lib/utils'
import { createSignal, onCleanup, onMount } from 'solid-js'

export const UserBadge = () => {
  const { session } = useAuthContext()
  const [isOpen, setIsOpen] = createSignal(false)

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-popover]')) {
      setIsOpen(false)
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return (
    <div class="relative" data-popover>
      <div
        class={cn(
          'absolute bottom-full right-0 mb-2 w-full transition-all duration-200 origin-bottom',
          'rounded-lg bg-zinc-950 border border-zinc-800 text-sm shadow-lg shadow-black/20',
          isOpen()
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <ul>
          <li class="flex items-center overflow-hidden gap-2 border-b border-zinc-800 p-2.5">
            <span class="rounded-full bg-primary-200/50 aspect-square shrink-0 size-8 flex justify-center items-center">
              A
            </span>
            <div class="flex flex-col overflow-hidden">
              <span class="overflow-hidden text-ellipsis">
                {session()?.user.user_metadata?.name ?? 'User'}
              </span>
              <span class="overflow-hidden text-ellipsis text-xs text-zinc-400">
                {session()?.user.email}
              </span>
            </div>
          </li>
          <li class="border-b border-zinc-800 p-1">
            <button class="rounded hover:bg-zinc-800 p-1.5 w-full text-start">
              Settings
            </button>
          </li>
          <li class="p-1">
            <button class="rounded hover:bg-zinc-800 p-1.5 w-full text-start">
              Log out
            </button>
          </li>
        </ul>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        class={cn(
          'text-sm p-2 rounded-md w-full flex items-center gap-2 hover:bg-primary-200/10 outline-none focus-visible:ring-2 ring-primary-200/30',
          isOpen() ? 'bg-primary-200/10' : ''
        )}
      >
        <span class="rounded-full bg-primary-200/50 aspect-square shrink-0 size-8 flex justify-center items-center">
          A
        </span>
        <div class="flex items-center overflow-hidden">
          <span class="overflow-hidden text-ellipsis">
            {session()?.user.email}
          </span>
        </div>
        <ChevronsUpDownIcon class="size-5" />
      </button>
    </div>
  )
}
