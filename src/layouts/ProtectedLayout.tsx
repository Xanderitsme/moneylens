import { useAuthContext } from '@/core/context/auth/auth.provider'
import { Navigate } from '@solidjs/router'
import { Match, Switch, type ParentComponent } from 'solid-js'

export const ProtectedLayout: ParentComponent = ({ children }) => {
  const { session, isLoading } = useAuthContext()

  const LoadingFallback = () => <></>

  return (
    <>
      <Switch>
        <Match when={isLoading()}>
          <LoadingFallback />
        </Match>
        <Match when={session() == null && !isLoading()}>
          <Navigate href="/login" />
        </Match>
        <Match when={session() != null && !isLoading()}>{children}</Match>
      </Switch>
    </>
  )
}
