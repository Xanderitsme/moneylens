import { Header } from '@/core/components/sections/Header'
import { Sidebar } from '@/core/components/sections/Sidebar'
import { PageContextProvider } from '@/core/context/page/page.provider'
import type { ParentComponent } from 'solid-js'

export const DashboardLayout: ParentComponent = (props) => {
  return (
    <div class="flex h-dvh w-dvw bg-linear-to-br from-primary-950/10 to-primary-950/5 overflow-hidden">
      <Sidebar />
      <div class="h-full grow sm:p-2 pl-0 overflow-auto">
        <div class="sm:rounded-lg overflow-hidden bg-zinc-950 h-full">
          <div class="bg-primary-950/10 h-full flex flex-col">
            <PageContextProvider>
              <Header />
              {props.children}
            </PageContextProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
