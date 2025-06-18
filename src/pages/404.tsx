import { pickRandom } from '@/core/lib/utils'

const emojis = ['(っ°Д°;)っ', '(；′⌒`)', '~(>_<。)\\ ', '(´。＿。｀)', '(⊙_⊙)?']

const Page404 = () => {
  const emoji = pickRandom(emojis)

  return (
    <div class="h-full bg-zinc-950">
      <div class="h-full bg-linear-to-br from-primary-950/15 to-primary-950/5 flex justify-center items-center">
        <main class="text-primary-50 max-w-4xl flex flex-col gap-8 p-4">
          <span class="dynamic-rainbow font-bold text-center w-fit mx-auto text-7xl sm:text-8xl lg:text-9xl text-nowrap py-2 selection:text-primary-100">
            {emoji}
          </span>

          <h1 class="font-semibold text-center text-balance text-3xl sm:text-4xl lg:text-5xl">
            ¡Oh, no! Parece que te perdiste.
          </h1>
          <div class="text-center font-light text-balance">
            Parece que estás buscando algo que no existe. ¿Quizás te equivocaste
            de URL? O tal vez la página que buscas se ha trasladado o eliminado.
          </div>

          <div class="flex justify-center mt-4">
            <a href="/" class="contents">
              <button
                class="px-6 py-4
									font-bold text
									border border-current
									hover:bg-primary-50 hover:text-primary-950
									transition-colors"
              >
                Volver al inicio
              </button>
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page404
