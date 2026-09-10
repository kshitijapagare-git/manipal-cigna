import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TableFiltersProps {
  children: ReactNode
  className?: string
}

/**
 * Generic filter-bar shell. It simply lays out whatever filter controls the
 * caller passes as children (a search box, a select, a date range, …) — it
 * has no built-in notion of which fields a particular entity is filterable
 * by, or how those filters combine.
 */
export function TableFilters({ children, className }: TableFiltersProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-lg bg-white p-3 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
