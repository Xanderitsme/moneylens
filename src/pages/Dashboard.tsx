import { Button } from '@/core/components/ui/Button'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { A, useNavigate } from '@solidjs/router'

export const DashboardPage = () => {
  const { session, signOut } = useAuthContext()
  const navigate = useNavigate()

  return (
    <main class="p-4 h-full">
      <h1>Dashboard page</h1>
      <A href="/login">
        <button
          class="px-4 py-3 bg-white/5 rounded border border-transparent text-zinc-400
        hover:bg-white/10 hover:border-white/50 hover:text-zinc-300
        active:bg-white/15 active:border-white/60 active:text-zinc-100
        transition-colors"
        >
          Go to login page
        </button>
      </A>
      <A href="/">
        <button
          class="px-4 py-3 bg-white/5 rounded border border-transparent text-zinc-400
        hover:bg-white/10 hover:border-white/50 hover:text-zinc-300
        active:bg-white/15 active:border-white/60 active:text-zinc-100
        transition-colors"
        >
          Go home
        </button>
      </A>

      <div class="m-4">
        <Button
          onClick={() => {
            signOut()
            navigate('/login', { replace: true })
          }}
        >
          Sign out
        </Button>
      </div>

      <p class="text-wrap">{JSON.stringify(session()?.user, undefined, 1)}</p>
    </main>
  )
}
