import { Header } from '@/core/components/sections/Header'
import { Button } from '@/core/components/ui/Button'
import { signOut } from '@/core/controllers/auth.controller'
import { Chart2 } from '@/dashboard/components/Chart2'

export const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <main class="h-full flex flex-col">
        <div class="p-2 sm:p-4 overflow-auto scrollbar-thin">
          <Chart2 />
        </div>
        <div class="flex justify-center p-2">
          <Button
            class="w-fit"
            onClick={() => {
              signOut()
            }}
          >
            Sign Out
          </Button>
        </div>
      </main>
    </>
  )
}
