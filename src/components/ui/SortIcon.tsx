export type SortDirection = 'asc' | 'desc' | null

export interface SortIconProps {
  direction: SortDirection
}

/** Small up/down chevron indicator used in sortable table headers. */
export function SortIcon({ direction }: SortIconProps) {
  return (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none" aria-hidden="true">
      <span className={direction === 'asc' ? 'text-primary-600' : 'text-surface-300'}>▲</span>
      <span className={direction === 'desc' ? 'text-primary-600' : 'text-surface-300'}>▼</span>
    </span>
  )
}
