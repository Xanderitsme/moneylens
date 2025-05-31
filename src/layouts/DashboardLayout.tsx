// import { Header } from '@/core/components/Header'
import { Sidebar } from '@/core/components/Sidebar'
import type { ParentComponent } from 'solid-js'

export const DashboardLayout: ParentComponent = (props) => {
  return (
    <div class="flex h-full">
      <Sidebar />
      <div class="flex flex-col grow p-2">
        {/* <Header /> */}
        <div class="grow rounded-2xl overflow-hidden bg-primary-950">
          {props.children}
        </div>
      </div>
    </div>
  )
}
