import { createSignal, onMount, useContext } from 'solid-js'
import {
  AuthContext,
  type AuthContextType
} from '@/core/context/auth/auth.context'
import type { JSX } from 'solid-js/jsx-runtime'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/core/supabase'

interface Props {
  children?: JSX.Element
}

export const AuthContextProvider = (props: Props) => {
  const [session, setSession] = createSignal<Session | null>(null)
  const [isLoading, setIsLoading] = createSignal<boolean>(true)

  const signUpNewUser = async (email: string, password: string) => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    setIsLoading(false)

    if (error != null) {
      console.error(error)
    }

    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error != null) {
        console.error(error)
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: 'Something went wrong' }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)

    if (error != null) {
      console.error(error)
    }
  }

  onMount(async () => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.getSession()
    setIsLoading(false)

    if (error == null) {
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
