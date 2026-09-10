import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional class names and resolve conflicting Tailwind utility
 * classes (e.g. `px-2` vs `px-4`) in favour of the last one supplied.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
