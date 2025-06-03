import { onMount, onCleanup } from 'solid-js'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  once?: boolean
}

interface UseIntersectionObserverReturn {
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  disconnect: () => void
}

/**
 * Hook personalizado para usar Intersection Observer en SolidJS
 * @param callback - Función que se ejecuta cuando el elemento cambia de visibilidad
 * @param options - Opciones del Intersection Observer
 * @returns Objeto con métodos para controlar el observer
 */
export function useIntersectionObserver(
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
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
          callback(entry.isIntersecting, entry)

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
    observe: (element: Element) => {
      observer?.observe(element)
    },
    unobserve: (element: Element) => {
      observer?.unobserve(element)
    },
    disconnect: () => {
      observer?.disconnect()
    }
  }
}

export function useVisibilityObserver(
  callback: (element: Element) => void,
  options: IntersectionObserverOptions = {}
) {
  const { observe } = useIntersectionObserver(
    (isIntersecting, entry) => {
      if (isIntersecting) {
        callback(entry.target)
      }
    },
    { once: true, ...options }
  )

  return observe
}

export function useIntersectionRef(
  callback: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverOptions = {}
) {
  const { observe } = useIntersectionObserver(callback, options)

  return (element: Element) => {
    if (element) {
      observe(element)
    }
  }
}

export function useLazyInit(
  initCallback: (element: Element) => void,
  options: IntersectionObserverOptions = {}
) {
  let initialized = false

  const observeElement = useVisibilityObserver(
    (element) => {
      if (!initialized) {
        initialized = true
        initCallback(element)
      }
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    }
  )

  return observeElement
}
