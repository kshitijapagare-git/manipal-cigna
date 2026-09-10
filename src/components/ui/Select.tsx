import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-surface-300 bg-white px-3 py-2 text-sm',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200',
          'disabled:cursor-not-allowed disabled:bg-surface-100 disabled:text-surface-400',
          className,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  },
)

Select.displayName = 'Select'
