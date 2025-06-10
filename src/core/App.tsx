import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

import { Routes } from '@/core/Routes'
import { AuthContextProvider } from '@/core/context/auth/auth.provider'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
