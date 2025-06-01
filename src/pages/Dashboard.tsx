import { Button } from '@/core/components/ui/Button'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { useNavigate } from '@solidjs/router'

export const DashboardPage = () => {
  const { session, signOut } = useAuthContext()
  const navigate = useNavigate()

  return (
    <main class="p-4 h-full">
      <h1>Dashboard page</h1>

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
