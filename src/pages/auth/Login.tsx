import { Button } from '@/core/components/ui/Button'
import { A } from '@solidjs/router'

export const LoginPage = () => {
  return (
    <main class="flex justify-center items-center h-full bg-primary-950">
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
          <label class="space-y-2">
            <p class="text-sm">Email Adress</p>
            <input
              class="text-sm rounded border border-primary-800 px-3 py-2 font-light w-full"
              type="text"
              placeholder="email@example.com"
            />
          </label>

          <label class="space-y-2">
            <p class="text-sm">Password</p>
            <input
              class="text-sm rounded border border-primary-800 px-3 py-2 font-light w-full"
              type="password"
              placeholder="Password"
            />
          </label>

          <div class="mt-6 flex flex-col">
            <Button>Log in</Button>
          </div>
        </form>
        <p class="text-center text-sm text-zinc-400 mt-6">
          Don't have an account?{' '}
          <A
            class="underline decoration-primary-500 hover:decoration-primary-300 text-primary-200"
            href="/register"
          >
            Sign up
          </A>
        </p>
      </div>
    </main>
  )
}
