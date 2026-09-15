import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ActionMenu } from '../../components/ui/ActionMenu'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { CrudList, type CrudListColumn } from '../../components/ui/CrudList'
import { Pagination } from '../../components/ui/Pagination'
import { SearchInput } from '../../components/ui/SearchInput'
import { Select } from '../../components/ui/Select'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { TableFilters } from '../../components/ui/TableFilters'
import { formatCurrency } from '../../lib/formatters'
import { PAGE_SIZE } from '../../lib/constants'
import { claimApi } from './claimApi'
import { CLAIM_STATUSES, claimStatusLabel, type ClaimStatus } from './claimStatuses'
import type { Claim } from './types'

const statusFilterOptions = [
  { value: '', label: 'All Statuses' },
  ...CLAIM_STATUSES.map((status) => ({ value: status, label: claimStatusLabel(status) })),
]

export function ClaimListPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<Claim[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ClaimStatus | ''>('')
  const [isLoading, setIsLoading] = useState(true)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    claimApi
      .list({ page, pageSize: PAGE_SIZE, search, status: status || undefined })
      .then((result) => {
        if (cancelled) return
        setRows(result.data)
        setTotal(result.total)
        setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [page, search, status])

  // Searching resets pagination back to the first page.
  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  // Changing the status filter resets pagination back to the first page.
  function handleStatusChange(value: string) {
    setStatus(value as ClaimStatus | '')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (pendingDeleteId === null) return
    await claimApi.remove(pendingDeleteId)
    setPendingDeleteId(null)
    const result = await claimApi.list({
      page,
      pageSize: PAGE_SIZE,
      search,
      status: status || undefined,
    })
    setRows(result.data)
    setTotal(result.total)
  }

  const columns: CrudListColumn<Claim>[] = [
    { key: 'claimNumber', header: 'Claim #', render: (row) => row.claimNumber },
    { key: 'policyId', header: 'Policy', render: (row) => `#${row.policyId}` },
    { key: 'description', header: 'Description', render: (row) => row.description },
    { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-surface-900">Claims</h1>
        <Link
          to="/claims/new"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          New claim
        </Link>
      </div>

      <TableFilters>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by description…"
          className="max-w-xs"
        />
        <Select
          options={statusFilterOptions}
          value={status}
          onChange={(event) => handleStatusChange(event.target.value)}
          className="max-w-xs"
          aria-label="Filter by status"
        />
      </TableFilters>

      <CrudList
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No claims found"
        emptyDescription="Try a different search or create a new claim."
        onRowClick={(row) => navigate(`/claims/${row.id}`)}
        renderActions={(row) => (
          <ActionMenu
            items={[
              { label: 'View', onSelect: () => navigate(`/claims/${row.id}`) },
              { label: 'Edit', onSelect: () => navigate(`/claims/${row.id}/edit`) },
              { label: 'Delete', danger: true, onSelect: () => setPendingDeleteId(row.id) },
            ]}
          />
        )}
      />

      <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete claim?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  )
}
