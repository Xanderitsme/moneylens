import { onMount, onCleanup } from 'solid-js'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  once?: boolean
}

interface UseIntersectionObserverReturn<T extends Element = Element> {
  observe: (element: T) => void
  unobserve: (element: T) => void
  disconnect: () => void
}

/**
 * Hook personalizado para usar Intersection Observer en SolidJS
 * @param callback - Función que se ejecuta cuando el elemento cambia de visibilidad
 * @param options - Opciones del Intersection Observer
 * @returns Objeto con métodos para controlar el observer
 */
export function useIntersectionObserver<T extends Element = Element>(
  callback: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
    element: T
  ) => void,
  options: IntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  let observer: IntersectionObserver | null = null

  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    once = false
  } = options

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry.isIntersecting, entry, entry.target as T)

          if (once && entry.isIntersecting) {
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
        root
      }
    )
  })

  onCleanup(() => {
    observer?.disconnect()
  })

  return {
    observe: (element: T) => {
      observer?.observe(element)
    },
    unobserve: (element: T) => {
      observer?.unobserve(element)
    },
    disconnect: () => {
      observer?.disconnect()
    }
  }
}

export function useIntersectionRef<T extends Element = Element>(
  callback: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
    element: T
  ) => void,
  options: IntersectionObserverOptions = {}
) {
  const { observe } = useIntersectionObserver<T>(callback, options)

  return (element: T) => {
    if (element) {
      observe(element)
    }
  }
}

export function useLazyInit<T extends Element = Element>(
  initCallback: (element: T) => void,
  options: IntersectionObserverOptions = {}
) {
  let initialized = false

  const { observe } = useIntersectionObserver<T>(
    (isIntersecting, _, element) => {
      if (isIntersecting && !initialized) {
        initialized = true
        initCallback(element)
      }
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
      once: true,
      ...options
    }
  )

  return (element: T) => {
    if (element) {
      observe(element)
    }
  }
}
