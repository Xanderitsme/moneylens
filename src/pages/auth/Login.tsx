import { LoaderCircleIcon } from '@/core/components/icons/LoaderCircleIcon'
import { Anchor } from '@/core/components/ui/Anchor'
import { Button } from '@/core/components/ui/Button'
import { InputLabel } from '@/core/components/ui/InputLabel'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { useNavigate } from '@solidjs/router'
import { createSignal, Show } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface LoginForm {
  email: string
  password: string
}

export const LoginPage = () => {
  const [registerData, setRegisterData] = createSignal<LoginForm>({
    email: '',
    password: ''
  })
  const [error, setError] = createSignal('')

  const { signIn, isLoading } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (registerData().email == '' || registerData().password == '') {
      setError('Invalid email or password')
      return
    }

    const { error } = await signIn({
      email: registerData().email,
      password: registerData().password
    })

    if (error != null) {
      setError(error.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <main class="flex justify-center items-center h-full">
      <div class="max-w-96 w-full flex flex-col items-center">
        <header class="py-6 space-y-2">
          <h1 class="text-xl font-medium text-center">
            Log in to your account
          </h1>
          <p class="text-zinc-400 text-sm text-center font-light">
            Enter your email and password below to log in
          </p>
        </header>
        <form class="flex flex-col gap-6 w-full" onSubmit={handleSubmitForm}>
          <InputLabel
            text="Email Adress"
            type="email"
            autocomplete="email"
            placeholder="email@example.com"
            required
            value={registerData().email}
            onChange={(e) => {
              setError('')
              setRegisterData((prev) => ({
                ...prev,
                email: e.target.value
              }))
            }}
          />

          <InputLabel
            text="Password"
            type="password"
            placeholder="Password"
            required
            value={registerData().password}
            onChange={(e) => {
              setError('')
              setRegisterData((prev) => ({
                ...prev,
                password: e.target.value
              }))
            }}
          />

          <Show when={error().length > 0}>
            <p class="text-red-400 text-sm">{error()}</p>
          </Show>

          <div class="mt-6 flex flex-col">
            <Button
              type="submit"
              disabled={isLoading()}
              class="flex justify-center gap-2 items-center"
            >
              Log in
              <Show when={isLoading()}>
                <LoaderCircleIcon class="animate-spin shrink-0 h-6 w-6 text-primary-500" />
              </Show>
            </Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Don't have an account? <Anchor href="/register">Sign up</Anchor>
        </p>
      </div>
    </main>
  )
}
