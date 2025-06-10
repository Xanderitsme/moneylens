import { usePageContext } from '@/core/context/page/page.provider'
import { TransactionsList } from '@/dashboard/transactions/TransactionsList'
import { onMount } from 'solid-js'

const TransactionsPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Transactions')
  })

  return (
    <>
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <section class="container mx-auto">
          <TransactionsList />
        </section>
      </main>
    </>
  )
}

export default TransactionsPage
