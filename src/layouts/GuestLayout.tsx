import type { ParentComponent } from 'solid-js'

export const GuestLayout: ParentComponent = (props) => {
  return (
    <div class="h-full bg-zinc-950">
      <div class="h-full bg-linear-to-br from-primary-950/15 to-primary-950/5">
        {props.children}
      </div>
    </div>
  )
}
