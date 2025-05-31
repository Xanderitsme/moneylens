function App() {
  return (
    <div class="flex justify-center items-center h-dvh bg-linear-to-br from-gray-900 to-gray-950">
      <button
        class="px-4 py-3 bg-white/5 rounded border border-transparent text-zinc-400
          hover:bg-white/10 hover:border-white/50 hover:text-zinc-300
          active:bg-white/15 active:border-white/60 active:text-zinc-100
          transition-colors"
      >
        Do <span class="font-bold">NOT</span> click me
      </button>
    </div>
  )
}

export default App
