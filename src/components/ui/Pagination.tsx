export interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page < totalPages

  if (total === 0) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  return (
    <nav
      className="flex items-center justify-between gap-4 text-sm text-surface-600"
      aria-label="Pagination"
    >
      <p>
        Showing <span className="font-medium">{start}</span>–
        <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          className="rounded-md border border-surface-300 px-2.5 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          className="rounded-md border border-surface-300 px-2.5 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  )
}
