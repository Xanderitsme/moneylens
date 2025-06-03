import type { Session, User, WeakPassword } from '@supabase/supabase-js'

export type SignUpType = Method<
  {
    email: string
    password: string
  },
  {
    user: User
    session: Session
  },
  {
    message: string
  }
>

export type SignInType = Method<
  {
    email: string
    password: string
  },
  {
    user: User
    session: Session
    weakPassword?: WeakPassword
  },
  {
    message: string
  }
>

export type SignOutType = MethodError<
  never,
  {
    message: string
  }
>

export type GetSessionType = Method<
  never,
  {
    session: Session
  },
  {
    message: string
  }
>
