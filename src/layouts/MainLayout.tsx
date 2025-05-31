import { Footer } from '@/core/components/Footer'
import { Header } from '@/core/components/Header'
import type { ParentComponent } from 'solid-js'

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="flex flex-col h-dvh bg-linear-to-br from-gray-900 to-gray-950">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
