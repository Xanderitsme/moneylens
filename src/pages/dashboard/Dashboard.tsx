import { Header } from '@/core/components/sections/Header'
import { Button } from '@/core/components/ui/Button'
import { signOut } from '@/core/controllers/auth.controller'
import { Chart } from '@/dashboard/components/Chart'

export const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <main class="h-full flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div class="flex justify-center">
          <Chart />
        </div>
        <div class="flex justify-center">
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
