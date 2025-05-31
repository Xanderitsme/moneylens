import { Anchor } from '@/core/components/ui/Anchor'
import { Button } from '@/core/components/ui/Button'
import { InputLabel } from '@/core/components/ui/InputLabel'

export const LoginPage = () => {
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
        <form
          class="flex flex-col gap-6 w-full"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <InputLabel
            text="Email Adress"
            type="text"
            placeholder="email@example.com"
          />

          <InputLabel text="Password" type="password" placeholder="Password" />

          <div class="mt-6 flex flex-col">
            <Button>Log in</Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Don't have an account? <Anchor href="/register">Sign up</Anchor>
        </p>
      </div>
    </main>
  )
}
