import type { ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import { Spinner } from './Spinner'

export interface CrudListColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

export interface CrudListProps<T> {
  columns: CrudListColumn<T>[]
  rows: T[]
  getRowKey: (row: T) => string | number
  isLoading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  renderActions?: (row: T) => ReactNode
  onRowClick?: (row: T) => void
}

/**
 * Generic list/table renderer shared by every entity's list page. It knows
 * nothing about Policies or Claims specifically — it just renders whatever
 * columns and rows it is given.
 */
export function CrudList<T>({
  columns,
  rows,
  getRowKey,
  isLoading,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  renderActions,
  onRowClick,
}: CrudListProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center rounded-lg bg-white py-12 shadow-sm">
        <Spinner />
      </div>
    )
  }

  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="min-w-full divide-y divide-surface-200 text-sm">
        <thead className="bg-surface-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-surface-500"
              >
                {column.header}
              </th>
            ))}
            {renderActions ? <th scope="col" className="px-4 py-2.5" /> : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'cursor-pointer hover:bg-surface-50' : undefined}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-2.5 text-surface-700 ${column.className ?? ''}`}
                >
                  {column.render(row)}
                </td>
              ))}
              {renderActions ? (
                <td className="px-4 py-2.5 text-right" onClick={(event) => event.stopPropagation()}>
                  {renderActions(row)}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
