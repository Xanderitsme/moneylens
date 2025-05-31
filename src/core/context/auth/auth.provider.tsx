import { createEffect, createSignal, useContext } from 'solid-js'
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

  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error != null) {
      console.error(error)
    }

    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error != null) {
        console.error(error)
      }

      return { data, error }
    } catch (error) {
      console.error(error)
    }
  }

  createEffect(async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error == null) {
      setSession(data.session)
    }

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })
  })

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error != null) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
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
