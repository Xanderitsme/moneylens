import { supabase } from '@/core/services/supabase'
import type {
  GetSessionType,
  SignInType,
  SignOutType,
  SignUpType as SignUpType
} from '@/types/auth'

export const signUp: SignUpType = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error != null) {
      return { error: { message: error.message } }
    }

    const { user, session } = data

    if (user == null || session == null) {
      return {
        error: { message: 'Unexpected error retrieving the user session' }
      }
    }

    return {
      data: { user, session }
    }
  } catch {
    return {
      error: { message: 'Unexpected error' }
    }
  }
}

export const signIn: SignInType = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error != null) {
      return { error: { message: error.message } }
    }

    return { data }
  } catch {
    return {
      error: { message: 'Unexpected error' }
    }
  }
}

export const signOut: SignOutType = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error != null) {
      return { error: { message: error.message } }
    }
  } catch {
    return {
      error: { message: 'Unexpected error' }
    }
  }
}

export const getSession: GetSessionType = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error != null) {
    return {
      error: { message: error.message }
    }
  }

  const { session } = data

  if (session == null) {
    return {
      error: {
        message: 'Unexpected error retrieving the user session'
      }
    }
  }

  return { data: { session } }
}
