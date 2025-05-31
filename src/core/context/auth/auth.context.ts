import type {
  AuthError,
  Session,
  User,
  WeakPassword
} from '@supabase/supabase-js'
import { createContext, type Accessor } from 'solid-js'

export interface AuthContextType {
  session: Accessor<Session | null>
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
        data:
          | {
              user: User
              session: Session
              weakPassword?: WeakPassword
            }
          | {
              user: null
              session: null
              weakPassword?: null
            }
        error: AuthError | null
      }
    | undefined
  >
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(undefined)
