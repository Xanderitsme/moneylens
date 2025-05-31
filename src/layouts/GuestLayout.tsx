import type { ParentComponent } from 'solid-js'

export const GuestLayout: ParentComponent = (props) => {
  return <div class="h-full bg-zinc-950">{props.children}</div>
}
