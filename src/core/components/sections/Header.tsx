import { PanelLeftIcon } from '@/core/components/icons/PanelLeftIcon'
import { IconButton } from '@/core/components/ui/Button'
import { usePageContext } from '@/core/context/page/page.provider'
import { Show } from 'solid-js'

export const Header = () => {
  const { headerTitle } = usePageContext()

  return (
    <header class="px-2 py-2.5 sm:px-2.5 sm:py-4 border-b border-primary-300/10">
      <div class="flex gap-1 items-center">
        <IconButton aria-label="toggle sidebar">
          <PanelLeftIcon class="size-4 text-primary-50 shrink-0" />
        </IconButton>
        <Show when={headerTitle() != null}>
          <span class="text-sm font-medium">{headerTitle()}</span>
        </Show>
      </div>
    </header>
  )
}
