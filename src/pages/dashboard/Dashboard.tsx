import { Header } from '@/core/components/sections/Header'
import { Chart } from '@/dashboard/components/Chart'

const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div class="flex justify-center">
          <Chart class="bg-zinc-900 p-4 rounded-lg" />
        </div>
      </main>
    </>
  )
}

export default DashboardPage
