import { PanelLeftIcon } from '@/core/components/icons/PanelLeftIcon'
import { IconButton } from '@/core/components/ui/Button'
import { Chart } from '@/dashboard/components/Chart'

export const DashboardPage = () => {
  return (
    <main class="h-full flex flex-col">
      <header class="px-2.5 py-4 border-b border-primary-900/20">
        <div class="flex gap-1 items-center">
          <IconButton>
            <PanelLeftIcon class="size-4 text-primary-50 shrink-0" />
          </IconButton>
          <span class="text-sm">Dashboard</span>
        </div>
      </header>
      <div class="p-4 h-full overflow-auto scrollbar-thin">
        <Chart />
      </div>
    </main>
  )
}
