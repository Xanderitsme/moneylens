import { usePageContext } from '@/core/context/page/page.provider'
import { Chart } from '@/dashboard/components/Chart'
import { onMount } from 'solid-js'

const DashboardPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Dashboard')
  })

  return (
    <>
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div class="flex justify-center">
          <Chart class="bg-zinc-900 p-4 rounded-lg" />
        </div>
      </main>
    </>
  )
}

export default DashboardPage
