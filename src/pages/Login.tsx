import { A } from '@solidjs/router'

export const LoginPage = () => {
  return (
    <main>
      <h1>Login page</h1>
      <A href="/dashboard">
        <button
          class="px-4 py-3 bg-white/5 rounded border border-transparent text-zinc-400
        hover:bg-white/10 hover:border-white/50 hover:text-zinc-300
        active:bg-white/15 active:border-white/60 active:text-zinc-100
        transition-colors"
        >
          Go to dashboard page
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
    </main>
  )
}
