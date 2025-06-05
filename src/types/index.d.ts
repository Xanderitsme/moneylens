type Success<T> = {
  data: T
  error?: never
}

type Failure<E> = {
  data?: never
  error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>

type MaybePromise<T> = T | Promise<T>

type Method<A, T, E> = (args: A) => Promise<Result<T, E>>

type MethodError<A, E> = (args: A) => Promise<undefined | Failure<E>>

type MethodWithoutArgs<T, E> = () => Promise<Result<T, E>>

type MethodErrorWithoutArgs<E> = () => Promise<undefined | Failure<E>>

interface GenericError {
  message: string
}
