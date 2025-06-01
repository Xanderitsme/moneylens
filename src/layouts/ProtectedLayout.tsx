import { LoaderCircleIcon } from '@/core/components/icons/LoaderCircleIcon'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { Navigate } from '@solidjs/router'
import {
  createEffect,
  createSignal,
  Match,
  onCleanup,
  Switch,
  type ParentComponent
} from 'solid-js'

export const ProtectedLayout: ParentComponent = ({ children }) => {
  const { isLoading, session } = useAuthContext()
  const [showContent, setShowContent] = createSignal(false)
  const [minimumLoadingTime, setMinimumLoadingTime] = createSignal(true)

  createEffect(() => {
    let setMinimumLoadingTimer: NodeJS.Timeout | null = null
    let setShowContentTimer: NodeJS.Timeout | null = null

    if (!isLoading()) {
      setMinimumLoadingTime(false)
    }

    if (isLoading()) {
      setMinimumLoadingTime(true)
      setShowContent(false)

      setMinimumLoadingTimer = setTimeout(() => {
        setMinimumLoadingTime(false)
      }, 300)
    }

    if (!isLoading() && !minimumLoadingTime()) {
      setShowContentTimer = setTimeout(() => {
        setShowContent(true)
      }, 50)
    }

    onCleanup(() => {
      if (setMinimumLoadingTimer != null) {
        clearTimeout(setMinimumLoadingTimer)
      }

      if (setShowContentTimer != null) {
        clearTimeout(setShowContentTimer)
      }
    })
  })

  const shouldShowLoading = () => isLoading() || minimumLoadingTime()

  return (
    <>
      <Switch>
        <Match when={shouldShowLoading()}>
          <div class="loading-container visible">
            <div class="min-h-screen bg-linear-to-br from-primary-950/10 to-primary-950/5 flex flex-col justify-center items-center">
              <div class="bg-zinc-900 p-6 rounded-xl shadow-lg border border-primary-500/10">
                <div class="flex items-center space-x-4">
                  <LoaderCircleIcon class="animate-spin shrink-0 h-6 w-6 text-primary-100" />
                  <span class="text-primary-50/70 font-medium">
                    Verifing sesion...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Match>

        <Match when={!shouldShowLoading() && session() == null}>
          <div class="fade-enter fade-enter-active">
            <Navigate href="/login" />
          </div>
        </Match>

        <Match when={!shouldShowLoading() && session() != null}>
          <div class={`content-container ${showContent() ? 'loaded' : ''}`}>
            {children}
          </div>
        </Match>
      </Switch>
    </>
  )
}
