import { PanelLeftIcon } from '@/core/components/icons/PanelLeftIcon'
import { IconButton } from '@/core/components/ui/Button'
import { Show } from 'solid-js'

interface Props {
  title?: string
}

export const Header = ({ title }: Props) => (
  <header class="px-2 py-2.5 sm:px-2.5 sm:py-4 border-b border-primary-900/20">
    <div class="flex gap-1 items-center">
      <IconButton aria-label="toggle sidebar">
        <PanelLeftIcon class="size-4 text-primary-50 shrink-0" />
      </IconButton>
      <Show when={title != null}>
        <span class="text-sm">{title}</span>
      </Show>
    </div>
  </header>
)
