import type { ParentComponent } from 'solid-js'

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="h-dvh bg-zinc-900 font-inter">
      {props.children}
    </div>
  )
}
