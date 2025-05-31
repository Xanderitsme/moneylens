import type { JSX } from 'solid-js/jsx-runtime';

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    class="px-3 py-2 bg-white text-primary-950 hover:bg-primary-50 text-sm rounded font-medium"
    {...props}
  >
    {props.children}
  </button>
)
