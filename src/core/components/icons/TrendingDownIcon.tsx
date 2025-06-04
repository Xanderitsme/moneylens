import type { JSX } from 'solid-js/jsx-runtime'

export const TrendingDownIcon = (props: JSX.SVGElementTags['svg']) => (
  <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
    {...props}
  >
    <path d="M16 17h6v-6" />
    <path d="m22 17-8.5-8.5-5 5L2 7" />
  </svg>
)
