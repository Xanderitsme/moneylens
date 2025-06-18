import { ButtonOutlined } from '@/core/components/ui/Button'
import { cn } from '@/core/lib/utils'
import { createSignal, Show } from 'solid-js'

export const CategoriesList = () => {
  const [isVisible, setIsVisible] = createSignal(false)
  // let hideTimer: NodeJS.Timeout | null

  // const hideItem = () => {
  //   hideTimer = setTimeout(() => {
  //     setIsVisible(false)
  //   }, 200)
  // }

  const toggleVisibility = () => {
    setIsVisible((prev) => {
      return !prev
    })
  }

  return (
    <section class="container mx-auto">
      <div>This is a list</div>
      <ButtonOutlined onClick={toggleVisibility}>Toggle</ButtonOutlined>

      {/* <Show when={isVisible()}> */}
      <div
        class={cn(
          'mt-16 p-4 rounded-lg bg-zinc-900 w-fit max-w-48 border border-zinc-800 origin-top',
          isVisible() ? 'animate-fade-in' : 'animate-fade-out'
        )}
      >
        A UI toolkit for building accessible web apps and design systems with
        SolidJS.
      </div>
      {/* </Show> */}
    </section>
  )
}
