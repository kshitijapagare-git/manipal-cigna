import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components/ui/Spinner'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatCurrency } from '../../lib/formatters'
import { claimApi } from './claimApi'
import type { Claim } from './types'

export function ClaimDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [claim, setClaim] = useState<Claim | null | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    setClaim(undefined)
    claimApi.get(Number(id)).then((result) => setClaim(result ?? null))
  }, [id])

  if (claim === undefined) {
    return <Spinner label="Loading claim…" />
  }

  if (claim === null) {
    return <EmptyState title="Claim not found" description="It may have been deleted." />
  }

  // The parent policy is shown only as a plain reference/link — no reverse
  // claims-list-on-policy-detail feature is built here.
  const fields: Array<[string, ReactNode]> = [
    ['Claim number', claim.claimNumber],
    [
      'Policy',
      <Link
        key="policy"
        to={`/policies/${claim.policyId}`}
        className="text-primary-600 hover:underline"
      >
        #{claim.policyId}
      </Link>,
    ],
    ['Description', claim.description],
    ['Amount', formatCurrency(claim.amount)],
    ['Status', <StatusBadge key="status" status={claim.status} />],
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-surface-900">{claim.claimNumber}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/claims/${claim.id}/edit`)}
            className="rounded-md border border-surface-300 px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-50"
          >
            Edit
          </button>
          <Link
            to="/claims"
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
