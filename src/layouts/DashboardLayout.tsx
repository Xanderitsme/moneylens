// import { Header } from '@/core/components/Header'
import { Sidebar } from '@/core/components/sections/Sidebar'
import type { ParentComponent } from 'solid-js'

export const DashboardLayout: ParentComponent = (props) => {
  return (
    <div class="flex h-full bg-linear-to-br from-primary-950/10 to-primary-950/5">
      <Sidebar />
      <div class="flex flex-col grow p-2">
        {/* <Header /> */}
        <div class='grow rounded-2xl overflow-hidden bg-zinc-950'>
          <div class="bg-primary-950/5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
