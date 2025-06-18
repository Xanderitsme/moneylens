import { usePageContext } from '@/core/context/page/page.provider'
import { CategoriesList } from '@/dashboard/categories/CategoriesList'
import { onMount } from 'solid-js'

export const CategoriesPage = () => {
  const { setHeaderTitle } = usePageContext()

  onMount(() => {
    setHeaderTitle('Categories')
  })

  return (
    <main class="grow flex flex-col p-2 sm:p-4 overflow-auto scrollbar-thin">
      <CategoriesList />
    </main>
  )
}

export default CategoriesPage
