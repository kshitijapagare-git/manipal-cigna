import { forwardRef, type InputHTMLAttributes } from 'react'
import { Input } from './Input'

export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/** Thin wrapper around a native date input, kept generic and reusable. */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  return <Input ref={ref} type="date" {...props} />
})

DatePicker.displayName = 'DatePicker'
