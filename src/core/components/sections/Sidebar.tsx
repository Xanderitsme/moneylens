import { CoinsIcon } from '@/core/components/icons/CoinsIcon'
import { A, type AnchorProps } from '@solidjs/router'
import { cn } from '@/core/lib/utils'
import { LayoutDashboardIcon } from '@/core/components/icons/LayoutDashboardIcon'
import { For, Show, type JSX } from 'solid-js'
import { WalletIcon } from '@/core/components/icons/WalletIcon'
import { ShapesIcon } from '@/core/components/icons/ShapesIcon'
import { ArrowDownUpIcon } from '@/core/components/icons/ArrowDownUpIcon'
import { UserBadge } from '@/dashboard/components/UserBadge'

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
      'text-sm p-2 rounded-md w-full flex items-center gap-2',
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
    href: '/dashboard/transactions',
    text: 'Transactions',
    icon: ArrowDownUpIcon
  },
  {
    href: '/dashboard/wallets',
    text: 'Wallets',
    icon: WalletIcon
  },
  {
    href: '/dashboard/categories',
    text: 'Categories',
    icon: ShapesIcon
  }
]

export const Sidebar = () => {
  return (
    <aside class="w-64 h-full shrink-0 flex flex-col">
      <header class="p-2">
        <SidebarLink
          href="/dashboard"
          class="flex flex-wrap items-center gap-3 p-2"
          activeClass=""
        >
          <div class="p-1 bg-primary-50 rounded-md">
            <CoinsIcon class="w-5 h-5 shrink-0 text-black" />
          </div>
          <span class="font-semibold text-primary-50 text-sm">MoneyLens</span>
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
                  <SidebarLink href={Item.href} aria-current="page" end>
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
        <UserBadge />
      </footer>
    </aside>
  )
}
