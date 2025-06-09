import { createEffect, createSignal, useContext } from 'solid-js'
import {
  PageContext,
  type PageContextType
} from '@/core/context/page/page.context'
import type { JSX } from 'solid-js/jsx-runtime'

interface Props {
  children?: JSX.Element
}

export const PageContextProvider = (props: Props) => {
  const [headerTitle, setHeaderTitle] = createSignal<string | undefined>()

  createEffect(() => {
    console.log(headerTitle())
  })

  return (
    <PageContext.Provider
      value={{
        headerTitle,
        setHeaderTitle
      }}
    >
      {props.children}
    </PageContext.Provider>
  )
}

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext)

  if (context == null) {
    throw new Error('Missing context Provider for PageContext')
  }

  return context
}
