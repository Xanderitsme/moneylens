import { usePageContext } from '@/core/context/page/page.provider'
import { onMount } from 'solid-js'

const TransactionsPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Transactions')
  })

  return (
    <>
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div>Transaction page</div>
      </main>
    </>
  )
}

export default TransactionsPage
