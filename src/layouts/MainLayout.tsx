import { AuthContextProvider } from '@/core/context/auth/auth.provider'
import type { ParentComponent } from 'solid-js'

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="h-dvh w-dvw bg-zinc-900 font-inter overflow-hidden">
      <AuthContextProvider>{props.children}</AuthContextProvider>
    </div>
  )
}
