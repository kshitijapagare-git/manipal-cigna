import { cn } from '../../lib/cn'

export interface SpinnerProps {
  className?: string
  label?: string
}

export function Spinner({ className, label = 'Loading…' }: SpinnerProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-surface-500" role="status">
      <span
        className={cn(
          'inline-block h-4 w-4 animate-spin rounded-full border-2 border-surface-300 border-t-primary-600',
          className,
        )}
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  )
}
