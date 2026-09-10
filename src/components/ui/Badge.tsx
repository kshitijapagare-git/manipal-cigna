import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-100 text-surface-700',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

/** Generic pill/badge. Entity-specific colouring lives on top of this. */
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
