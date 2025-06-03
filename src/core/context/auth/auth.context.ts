import type { SignInType, SignOutType, SignUpType } from '@/types/auth'
import type { Session } from '@supabase/supabase-js'
import { createContext, type Accessor } from 'solid-js'

export interface AuthContextType {
  session: Accessor<Session | null>
  isLoading: Accessor<Boolean>
  signUpNewUser: SignUpType
  signIn: SignInType
  signOut: SignOutType
  errorMessage: Accessor<string | undefined>
}

export const AuthContext = createContext<AuthContextType>(undefined)
