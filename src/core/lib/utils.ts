import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pickRandom = <T>(array: T[]) => {
  if (array.length === 0) {
    throw new Error('Unexpected empty array')
  }

  if (array.length === 1) {
    return array[0]
  }

  return array[Math.floor(Math.random() * array.length)]
}
