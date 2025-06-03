export function tryCatchAll<T, E = Error>(
  arg: Promise<T> | (() => MaybePromise<T>)
): Result<T, E> | Promise<Result<T, E>> {
  if (typeof arg === 'function') {
    try {
      const result = arg()

      return result instanceof Promise ? tryCatchAll(result) : { data: result }
    } catch (error) {
      return { error: error as E }
    }
  }

  return arg
    .then((data) => ({ data }))
    .catch((error) => ({ error: error as E }))
}
