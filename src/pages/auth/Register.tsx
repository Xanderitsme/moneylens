import { LoaderCircleIcon } from '@/core/components/icons/LoaderCircleIcon'
import { Anchor } from '@/core/components/ui/Anchor'
import { Button } from '@/core/components/ui/Button'
import { InputLabel } from '@/core/components/ui/InputLabel'
import { useAuthContext } from '@/core/context/auth/auth.provider'
import { useNavigate } from '@solidjs/router'
import { createSignal, Show } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface RegisterForm {
  email: string
  password: string
  passwordConfirmation: string
  name: string
}

export const RegisterPage = () => {
  const [registerData, setRegisterData] = createSignal<RegisterForm>({
    email: '',
    password: '',
    passwordConfirmation: '',
    name: ''
  })
  const [error, setError] = createSignal('')

  const { signUpNewUser, isLoading } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (
      registerData().email == '' ||
      registerData().password == '' ||
      registerData().name == ''
    ) {
      setError('Please enter your data to create your account')
      return
    }

    if (registerData().password !== registerData().passwordConfirmation) {
      setError("Passwords don't match")
      return
    }

    const { error } = await signUpNewUser({
      email: registerData().email,
      password: registerData().password,
      name: registerData().name
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
          <h1 class="text-xl font-medium text-center">Create an account</h1>
          <p class="text-zinc-400 text-sm text-center font-light">
            Enter your details below to create your account
          </p>
        </header>
        <form class="flex flex-col gap-6 w-full" onSubmit={handleSubmitForm}>
          <InputLabel
            text="Name"
            type="text"
            autocomplete="name"
            placeholder="Juan Perez"
            required
            value={registerData().name}
            onChange={(e) => {
              setError('')
              setRegisterData((prev) => ({
                ...prev,
                name: e.target.value
              }))
            }}
          />

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

          <InputLabel
            text="Confirm Password"
            type="password"
            placeholder="Confirm password"
            required
            value={registerData().passwordConfirmation}
            onChange={(e) => {
              setError('')
              setRegisterData((prev) => ({
                ...prev,
                passwordConfirmation: e.target.value
              }))
            }}
          />

          <Show when={error().length > 0}>
            <p class="text-red-400 text-sm">{error()}</p>
          </Show>

          <div class="mt-6 flex flex-col">
            <Button type="submit" disabled={isLoading()}>
              <span>Create account</span>
              <Show when={isLoading()}>
                <LoaderCircleIcon class="animate-spin shrink-0 h-6 w-6 text-primary-500" />
              </Show>
            </Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Already have an account? <Anchor href="/login">Log in</Anchor>
        </p>
      </div>
    </main>
  )
}
