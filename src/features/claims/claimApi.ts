import { apiRequest } from '../../lib/apiClient'
import { MOCK_LATENCY_MS, PAGE_SIZE, USE_MOCK } from '../../lib/constants'
import type { Claim, ClaimInput, ListClaimsParams, ListClaimsResult } from './types'

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS))
}

// Module-level in-memory "database", seeded with a handful of records.
let claims: Claim[] = [
  {
    id: 1,
    claimNumber: 'CLM-2001',
    policyId: 1,
    description: 'Hospitalization for minor surgery',
    amount: 1800,
    status: 'SUBMITTED',
  },
  {
    id: 2,
    claimNumber: 'CLM-2002',
    policyId: 2,
    description: 'Accidental death benefit request',
    amount: 12000,
    status: 'UNDER_REVIEW',
  },
  {
    id: 3,
    claimNumber: 'CLM-2003',
    policyId: 3,
    description: 'Rear bumper collision damage',
    amount: 900,
    status: 'APPROVED',
  },
  {
    id: 4,
    claimNumber: 'CLM-2004',
    policyId: 4,
    description: 'Water damage from burst pipe',
    amount: 2200,
    status: 'REJECTED',
  },
  {
    id: 5,
    claimNumber: 'CLM-2005',
    policyId: 1,
    description: 'Outpatient consultation reimbursement',
    amount: 350,
    status: 'SETTLED',
  },
]

let nextId = claims.length + 1

async function list(params: ListClaimsParams = {}): Promise<ListClaimsResult> {
  if (!USE_MOCK) {
    const query = new URLSearchParams()
    if (params.page) query.set('page', String(params.page))
    if (params.pageSize) query.set('pageSize', String(params.pageSize))
    if (params.search) query.set('description', params.search)
    if (params.status) query.set('status', params.status)
    return apiRequest<ListClaimsResult>(`/claims?${query.toString()}`)
  }

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? PAGE_SIZE
  const search = params.search?.trim().toLowerCase()
  const status = params.status

  const filtered = claims.filter((claim) => {
    const matchesSearch = search ? claim.description.toLowerCase().includes(search) : true
    const matchesStatus = status ? claim.status === status : true
    return matchesSearch && matchesStatus
  })

  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)
  return delay({ data, total: filtered.length })
}

async function get(id: number): Promise<Claim | undefined> {
  if (!USE_MOCK) {
    return apiRequest<Claim>(`/claims/${id}`)
  }
  return delay(claims.find((claim) => claim.id === id))
}

async function create(input: ClaimInput): Promise<Claim> {
  if (!USE_MOCK) {
    return apiRequest<Claim>('/claims', { method: 'POST', body: input })
  }
  const created: Claim = { id: nextId++, ...input }
  claims = [created, ...claims]
  return delay(created)
}

async function update(id: number, input: ClaimInput): Promise<Claim> {
  if (!USE_MOCK) {
    return apiRequest<Claim>(`/claims/${id}`, { method: 'PUT', body: input })
  }
  claims = claims.map((claim) => (claim.id === id ? { ...claim, ...input, id } : claim))
  const updated = claims.find((claim) => claim.id === id)
  if (!updated) throw new Error(`Claim ${id} not found`)
  return delay(updated)
}

async function remove(id: number): Promise<void> {
  if (!USE_MOCK) {
    await apiRequest<void>(`/claims/${id}`, { method: 'DELETE' })
    return
  }
  claims = claims.filter((claim) => claim.id !== id)
  await delay(undefined)
}

export const claimApi = { list, get, create, update, remove }
