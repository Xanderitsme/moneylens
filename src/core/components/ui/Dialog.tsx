import type { Component, ComponentProps, JSX, ValidComponent } from 'solid-js'
import { splitProps } from 'solid-js'
import * as DialogPrimitive from '@kobalte/core/dialog'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import { cn } from '@/core/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal: Component<DialogPrimitive.DialogPortalProps> = (props) => {
  const [, rest] = splitProps(props, ['children'])
  return (
    <DialogPrimitive.Portal {...rest}>
      <div class="fixed inset-0 z-50 flex items-start justify-center">
        {props.children}
      </div>
    </DialogPrimitive.Portal>
  )
}

type DialogOverlayProps<T extends ValidComponent = 'div'> =
  DialogPrimitive.DialogOverlayProps<T> & { class?: string | undefined }

const DialogOverlay = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, DialogOverlayProps<T>>
) => {
  const [, rest] = splitProps(props as DialogOverlayProps, ['class'])
  return (
    <DialogPrimitive.Overlay
      class={cn(
        'fixed inset-0 z-50 bg-black/40',
        'data-[expanded]:animate-in data-[expanded]:fade-in',
        'data-[closed]:animate-out data-[closed]:fade-out',
        props.class
      )}
      {...rest}
    />
  )
}

type DialogContentProps<T extends ValidComponent = 'div'> =
  DialogPrimitive.DialogContentProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const DialogContent = <T extends ValidComponent = 'div'>(
  props: PolymorphicProps<T, DialogContentProps<T>>
) => {
  const [, rest] = splitProps(props as DialogContentProps, [
    'class',
    'children'
  ])
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        class={cn(
          'fixed left-1/2 top-1/2 z-50 grid max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg sm:rounded-lg',
          'data-[expanded]:animate-in data-[expanded]:fade-in data-[expanded]:zoom-in-95 data-[expanded]:slide-in-from-bottom-5',
          'data-[closed]:animate-out data-[closed]:fade-out  data-[closed]:zoom-out-95 data-[closed]:slide-out-to-bottom-5',
          props.class
        )}
        {...rest}
      >
        {props.children}
        <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[expanded]:bg-accent data-[expanded]:text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-6"
          >
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
          <span class="sr-only">Close</span>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const DialogHeader: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return <div class={cn('flex flex-col space-y-1.5', props.class)} {...rest} />
}

const DialogFooter: Component<ComponentProps<'div'>> = (props) => {
  const [, rest] = splitProps(props, ['class'])
  return (
    <div
      class={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        props.class
      )}
      {...rest}
    />
  )
}

type DialogTitleProps<T extends ValidComponent = 'h2'> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string | undefined
  }

const DialogTitle = <T extends ValidComponent = 'h2'>(
  props: PolymorphicProps<T, DialogTitleProps<T>>
) => {
  const [, rest] = splitProps(props as DialogTitleProps, ['class'])
  return (
    <DialogPrimitive.Title
      class={cn(
        'text-lg font-semibold leading-none tracking-tight',
        props.class
      )}
      {...rest}
    />
  )
}

type DialogDescriptionProps<T extends ValidComponent = 'p'> =
  DialogPrimitive.DialogDescriptionProps<T> & {
    class?: string | undefined
  }

const DialogDescription = <T extends ValidComponent = 'p'>(
  props: PolymorphicProps<T, DialogDescriptionProps<T>>
) => {
  const [, rest] = splitProps(props as DialogDescriptionProps, ['class'])
  return (
    <DialogPrimitive.Description
      class={cn('text-sm text-zinc-300', props.class)}
      {...rest}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
