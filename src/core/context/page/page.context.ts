import { createContext, type Accessor } from 'solid-js'

export interface PageContextType {
  headerTitle: Accessor<string | undefined>
  setHeaderTitle: (title: string) => void
}

export const PageContext = createContext<PageContextType>(undefined)
