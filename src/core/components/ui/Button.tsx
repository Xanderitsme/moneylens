import type { JSX } from 'solid-js/jsx-runtime';

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    class="px-3 py-2 bg-white text-primary-900 hover:bg-primary-100 text-sm rounded"
    {...props}
  >
    {props.children}
  </button>
)
