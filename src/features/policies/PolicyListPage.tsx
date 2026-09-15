import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ActionMenu } from '../../components/ui/ActionMenu'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { CrudList, type CrudListColumn } from '../../components/ui/CrudList'
import { Pagination } from '../../components/ui/Pagination'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatCurrency, formatDate } from '../../lib/formatters'
import { PAGE_SIZE } from '../../lib/constants'
import { policyApi } from './policyApi'
import type { Policy } from './types'

export function PolicyListPage() {
  const navigate = useNavigate()
  const [rows, setRows] = useState<Policy[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    policyApi.list({ page, pageSize: PAGE_SIZE }).then((result) => {
      if (cancelled) return
      setRows(result.data)
      setTotal(result.total)
      setIsLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [page])

  async function handleConfirmDelete() {
    if (pendingDeleteId === null) return
    await policyApi.remove(pendingDeleteId)
    setPendingDeleteId(null)
    const result = await policyApi.list({ page, pageSize: PAGE_SIZE })
    setRows(result.data)
    setTotal(result.total)
  }

  const columns: CrudListColumn<Policy>[] = [
    { key: 'policyNumber', header: 'Policy #', render: (row) => row.policyNumber },
    { key: 'holderName', header: 'Holder', render: (row) => row.holderName },
    { key: 'type', header: 'Type', render: (row) => row.type },
    { key: 'premium', header: 'Premium', render: (row) => formatCurrency(row.premium) },
    { key: 'renewalDate', header: 'Renewal date', render: (row) => formatDate(row.renewalDate) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-surface-900">Policies</h1>
        <Link
          to="/policies/new"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          New policy
        </Link>
      </div>

      <CrudList
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No policies yet"
        emptyDescription="Create your first policy to get started."
        onRowClick={(row) => navigate(`/policies/${row.id}`)}
        renderActions={(row) => (
          <ActionMenu
            items={[
              { label: 'View', onSelect: () => navigate(`/policies/${row.id}`) },
              { label: 'Edit', onSelect: () => navigate(`/policies/${row.id}/edit`) },
              { label: 'Delete', danger: true, onSelect: () => setPendingDeleteId(row.id) },
            ]}
          />
        )}
      />

      <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete policy?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  )
}
