import { Anchor } from '@/core/components/ui/Anchor'
import { Button } from '@/core/components/ui/Button'
import { InputLabel } from '@/core/components/ui/InputLabel'
import { supabase } from '@/core/supabase'
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

    console.log(data)
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
            text="Email Adress"
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

          <InputLabel
            text="Password"
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

          <InputLabel
            text="Confirm Password"
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

          <div class="mt-6 flex flex-col">
            <Button>Create account</Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Already have an account? <Anchor href="/login">Log in</Anchor>
        </p>
      </div>
    </main>
  )
}
