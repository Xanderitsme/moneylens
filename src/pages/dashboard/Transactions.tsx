import { Header } from '@/core/components/sections/Header'

const TransactionsPage = () => {
  return (
    <>
      <Header title="Transactions" />
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div>Transaction page</div>
      </main>
    </>
  )
}

export default TransactionsPage
