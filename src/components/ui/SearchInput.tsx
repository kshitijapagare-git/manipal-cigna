import type { InputHTMLAttributes } from 'react'
import { Input } from './Input'

export interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  value: string
  onChange: (value: string) => void
}

/** Plain, generic search box. Callers decide which field it searches. */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  ...props
}: SearchInputProps) {
  return (
    <Input
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      aria-label={placeholder}
      {...props}
    />
  )
}
