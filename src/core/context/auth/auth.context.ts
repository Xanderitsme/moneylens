import type {
  AuthError,
  Session,
  User,
  WeakPassword
} from '@supabase/supabase-js'
import { createContext, type Accessor } from 'solid-js'

export interface AuthContextType {
  session: Accessor<Session | null>
  isLoading: Accessor<Boolean>
  signUpNewUser: (
    email: string,
    password: string
  ) => Promise<{
    data:
      | {
          user: User | null
          session: Session | null
        }
      | {
          user: null
          session: null
        }
    error: AuthError | null
  }>
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | {
        data: null
        error: string
      }
    | {
        data: {
          user: User
          session: Session
          weakPassword?: WeakPassword
        }
        error: null
      }
  >
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(undefined)
