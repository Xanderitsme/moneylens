import { useAuthContext } from '@/core/context/auth/auth.provider'
import { useNavigate } from '@solidjs/router'
import { createEffect, type ParentComponent } from 'solid-js'

export const GuestLayout: ParentComponent = (props) => {
  const auth = useAuthContext()
  const navigate = useNavigate()

  createEffect(() => {
    if (auth.session() != null) {
      navigate('/dashboard', { replace: true })
    }
  })

  return (
    <div class="h-full bg-zinc-950">
      <div class="h-full bg-linear-to-br from-primary-950/15 to-primary-950/5">
        {props.children}
      </div>
    </div>
  )
}
