import type { JSX } from 'solid-js/jsx-runtime'

export const ChevronsUpDownIcon = (props: JSX.SVGElementTags['svg']) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="m7 15 5 5 5-5"></path>
    <path d="m7 9 5-5 5 5"></path>
  </svg>
)
