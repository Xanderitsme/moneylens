import type { JSX } from 'solid-js/jsx-runtime'

export const PlusIcon = (props: JSX.SVGElementTags['svg']) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)
