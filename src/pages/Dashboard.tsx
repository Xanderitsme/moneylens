import { PanelLeftIcon } from '@/core/components/icons/PanelLeftIcon'
import { IconButton } from '@/core/components/ui/Button'
import { Chart2 } from '@/dashboard/components/Chart2'

export const DashboardPage = () => {
  return (
    <>
      <header class="px-2 py-2.5 sm:px-2.5 sm:py-4 border-b border-primary-900/20">
        <div class="flex gap-1 items-center">
          <IconButton>
            <PanelLeftIcon class="size-4 text-primary-50 shrink-0" />
          </IconButton>
          <span class="text-sm">Dashboard</span>
        </div>
      </header>
      <main class="h-full flex flex-col">
        <div class="p-2 sm:p-4 h-full overflow-auto scrollbar-thin">
          <Chart2 />
        </div>
      </main>
    </>
  )
}
