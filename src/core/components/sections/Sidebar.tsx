import { CoinsIcon } from '@/core/components/icons/CoinsIcon'
import { A, type AnchorProps } from '@solidjs/router'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { cn } from '@/core/lib/utils'
import { ChevronsUpDownIcon } from '@/core/components/icons/ChevronsUpDownIcon'
import { LayoutDashboardIcon } from '@/core/components/icons/LayoutDashboardIcon'
import { For, Show, type JSX } from 'solid-js'

type AriaCurrentType = 'page' | 'location' | 'step' | boolean

interface SidebarLinkProps extends AnchorProps {
  'aria-current'?: AriaCurrentType
}

const SidebarLink = ({
  children,
  class: className,
  'aria-current': ariaCurrent,
  ...props
}: SidebarLinkProps) => (
  <A
    class={cn(
      'text-sm p-2 rounded-lg w-full flex items-center gap-2',
      'hover:bg-primary-200/10 outline-none focus-visible:ring-2 ring-primary-200/30',
      className
    )}
    activeClass="bg-primary-200/10 font-medium"
    aria-current={ariaCurrent}
    {...props}
  >
    {children}
  </A>
)

interface SidebarLinkType {
  href: string
  text: string
  icon?: (props: JSX.SVGElementTags['svg']) => JSX.Element
}

const links: SidebarLinkType[] = [
  {
    href: '/dashboard',
    text: 'Dashboard',
    icon: LayoutDashboardIcon
  },
  {
    href: '/wallets',
    text: 'Wallets'
  },
  {
    href: '/categories',
    text: 'Categories'
  },

  {
    href: '/transactions',
    text: 'Transactions'
  }
]

export const Sidebar = () => {
  const { session } = useAuthContext()

  return (
    <aside class="w-64 h-full shrink-0 flex flex-col">
      <header class="p-2">
        <SidebarLink href="/dashboard" class="block p-0" activeClass="">
          <div class="flex flex-wrap items-center gap-3 p-2 rounded-lg">
            <div class="p-1 bg-primary-50 rounded-lg">
              <CoinsIcon class="w-5 h-5 shrink-0 text-black" />
            </div>
            <span class="font-semibold text-primary-50 text-sm">MoneyLens</span>
          </div>
        </SidebarLink>
      </header>
      <nav class="grow px-2 space-y-2">
        <div>
          <div class="text-xs text-zinc-400 font-semibold px-2 align-middle py-2">
            Platform
          </div>
          <ul class="gap-1 flex flex-col">
            <For each={links}>
              {(Item) => (
                <li>
                  <SidebarLink href={Item.href} aria-current="page">
                    <Show when={Item.icon}>
                      {(icon) => {
                        const ItemIcon = icon()
                        return <ItemIcon class="size-4" />
                      }}
                    </Show>
                    <span>{Item.text}</span>
                  </SidebarLink>
                </li>
              )}
            </For>
          </ul>
        </div>
      </nav>
      <footer class="p-2">
        <button class="text-sm p-2 rounded-lg w-full flex items-center gap-2 hover:bg-primary-200/10 outline-none focus-visible:ring-2 ring-primary-200/30">
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
      </footer>
    </aside>
  )
}
