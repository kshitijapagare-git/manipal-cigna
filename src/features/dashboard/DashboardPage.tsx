import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CrudList, type CrudListColumn } from '../../components/ui/CrudList'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatCurrency } from '../../lib/formatters'
import { claimApi } from '../claims/claimApi'
import type { Claim } from '../claims/types'

const RECENT_CLAIM_COUNT = 5

/**
 * The landing page: the most recent claims, as an at-a-glance starting point.
 *
 * Deliberately small. It exists so the app has a home that is not one of the two entity lists,
 * and it is the page anything "on the dashboard" belongs on.
 */
export function DashboardPage() {
  const navigate = useNavigate()
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    claimApi.list({ page: 1, pageSize: RECENT_CLAIM_COUNT }).then((result) => {
      if (cancelled) return
      setClaims(result.data)
      setIsLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const columns: CrudListColumn<Claim>[] = [
    { key: 'claimNumber', header: 'Claim #', render: (row) => row.claimNumber },
    { key: 'description', header: 'Description', render: (row) => row.description },
    { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-surface-900">Dashboard</h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-surface-500">
          Recent claims
        </h2>
        <CrudList
          columns={columns}
          rows={claims}
          getRowKey={(row) => row.id}
          isLoading={isLoading}
          emptyTitle="No claims yet"
          emptyDescription="Claims will appear here as they are filed."
          onRowClick={(row) => navigate(`/claims/${row.id}`)}
        />
      </div>
    </div>
  )
}
