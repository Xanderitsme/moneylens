import { Button } from '@/core/components/ui/Button'
import { supabase } from '@/core/supabase'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'
import type { DOMElement } from 'solid-js/jsx-runtime'

interface RegisterForm {
  email: string
  password: string
  passwordConfirmation: string
}

export const RegisterPage = () => {
  const [registerData, setRegisterData] = createSignal<RegisterForm>({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmitForm = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement
      target: DOMElement
    }
  ) => {
    e.preventDefault()

    if (registerData().password !== registerData().passwordConfirmation) {
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerData().email,
      password: registerData().password
    })

    if (error != null) {
      console.log(error)
      return
    }

    console.log(data);
  }

  return (
    <main class="flex justify-center items-center h-full bg-primary-950">
      <div class="max-w-96 w-full flex flex-col items-center">
        <header class="py-6 space-y-2">
          <h1 class="text-xl font-medium text-center">Create an account</h1>
          <p class="text-zinc-400 text-sm text-center font-light">
            Enter your details below to create your account
          </p>
        </header>
        <form class="flex flex-col gap-6 w-full" onSubmit={handleSubmitForm}>
          <label class="space-y-2">
            <p class="text-sm">Email Adress</p>
            <input
              class="text-sm rounded border border-primary-800 px-3 py-2 font-light w-full"
              type="email"
              autocomplete="email"
              placeholder="email@example.com"
              value={registerData().email}
              onChange={(e) => {
                setRegisterData((prev) => ({
                  ...prev,
                  email: e.target.value
                }))
              }}
            />
          </label>

          <label class="space-y-2">
            <p class="text-sm">Password</p>
            <input
              class="text-sm rounded border border-primary-800 px-3 py-2 font-light w-full"
              type="password"
              placeholder="Password"
              value={registerData().password}
              onChange={(e) => {
                setRegisterData((prev) => ({
                  ...prev,
                  password: e.target.value
                }))
              }}
            />
          </label>

          <label class="space-y-2">
            <p class="text-sm">Confirm Password</p>
            <input
              class="text-sm rounded border border-primary-800 px-3 py-2 font-light w-full"
              type="password"
              placeholder="Confirm password"
              value={registerData().passwordConfirmation}
              onChange={(e) => {
                setRegisterData((prev) => ({
                  ...prev,
                  passwordConfirmation: e.target.value
                }))
              }}
            />
          </label>

          <div class="mt-6 flex flex-col">
            <Button>Create account</Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{' '}
          <A
            class="underline decoration-primary-500 hover:decoration-primary-300 text-primary-200"
            href="/login"
          >
            Log in
          </A>
        </p>
      </div>
    </main>
  )
}
