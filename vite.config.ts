import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())

  const HOST = env.VITE_SERVER_HOST ?? undefined
  const PORT = parseInt(env.VITE_SERVER_PORT) ?? undefined

  return defineConfig({
    plugins: [solid(), tsconfigPaths(), tailwindcss()],
    server: {
      host: HOST,
      port: PORT
    }
  })
}
