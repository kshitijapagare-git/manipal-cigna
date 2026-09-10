import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-md border border-surface-300 bg-white px-3 py-2 text-sm',
        'placeholder:text-surface-400',
        'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
        'disabled:cursor-not-allowed disabled:bg-surface-100 disabled:text-surface-400',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
