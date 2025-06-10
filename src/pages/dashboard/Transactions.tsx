import { usePageContext } from '@/core/context/page/page.provider'
import { ButtonCreateTransaction } from '@/dashboard/transactions/ButtonCreateTransaction'
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
        <div class="flex justify-end gap-2">
          <ButtonCreateTransaction />
        </div>

        <section class="container mx-auto">
          <TransactionsList />
        </section>
      </main>
    </>
  )
}

export default TransactionsPage
