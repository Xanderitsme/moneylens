import { usePageContext } from '@/core/context/page/page.provider'
import { onMount } from 'solid-js'

export const CategoriesPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Categories')
  })

  return (
    <>
      <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
        <div>Categories page</div>
      </main>
    </>
  )
}

export default CategoriesPage
