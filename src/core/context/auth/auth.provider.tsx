import { createSignal, onMount, useContext } from 'solid-js'
import {
  AuthContext,
  type AuthContextType
} from '@/core/context/auth/auth.context'
import type { JSX } from 'solid-js/jsx-runtime'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/core/services/supabase'
import type { SignInType, SignOutType, SignUpType } from '@/types/auth'
import * as authController from '@/core/controllers/auth.controller'

interface Props {
  children?: JSX.Element
}

export const AuthContextProvider = (props: Props) => {
  const [session, setSession] = createSignal<Session | null>(null)
  const [isLoading, setIsLoading] = createSignal<boolean>(true)
  const [errorMessage, setErrorMessage] = createSignal<string | undefined>()

  const signUpNewUser: SignUpType = async ({ email, password, name }) => {
    setIsLoading(true)
    const result = await authController.signUp({ email, password, name })
    setIsLoading(false)

    return result
  }

  const signIn: SignInType = async ({ email, password }) => {
    setIsLoading(true)
    const result = await authController.signIn({ email, password })
    setIsLoading(false)

    return result
  }

  const signOut: SignOutType = async () => {
    setIsLoading(true)
    const result = await authController.signOut()
    setIsLoading(false)

    return result
  }

  onMount(async () => {
    setIsLoading(true)
    const { data, error } = await authController.getSession()
    setIsLoading(false)

    if (error != null) {
      setErrorMessage(error.message)
    } else {
      setSession(data.session)
    }

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })
  })

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        errorMessage,
        signUpNewUser,
        signIn,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error('Missing context Provider')
  }

  return context
}
