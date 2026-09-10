import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components/ui/Spinner'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatCurrency } from '../../lib/formatters'
import { policyApi } from './policyApi'
import type { Policy } from './types'

export function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [policy, setPolicy] = useState<Policy | null | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    setPolicy(undefined)
    policyApi.get(Number(id)).then((result) => setPolicy(result ?? null))
  }, [id])

  if (policy === undefined) {
    return <Spinner label="Loading policy…" />
  }

  if (policy === null) {
    return <EmptyState title="Policy not found" description="It may have been deleted." />
  }

  const fields: Array<[string, ReactNode]> = [
    ['Policy number', policy.policyNumber],
    ['Holder name', policy.holderName],
    ['Type', policy.type],
    ['Premium', formatCurrency(policy.premium)],
    ['Status', <StatusBadge key="status" status={policy.status} />],
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-surface-900">{policy.policyNumber}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/policies/${policy.id}/edit`)}
            className="rounded-md border border-surface-300 px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50"
          >
            Edit
          </button>
          <Link
            to="/policies"
            className="rounded-md border border-surface-300 px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50"
          >
            Back to list
          </Link>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-4 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-surface-500">
              {label}
            </dt>
            <dd className="mt-1 text-sm text-surface-800">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
