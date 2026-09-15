import { apiRequest } from '../../lib/apiClient'
import { MOCK_LATENCY_MS, PAGE_SIZE, USE_MOCK } from '../../lib/constants'
import type { ListPoliciesParams, ListPoliciesResult, Policy, PolicyInput } from './types'

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_LATENCY_MS))
}

// Module-level in-memory "database", seeded with a handful of records.
let policies: Policy[] = [
  {
    id: 1,
    policyNumber: 'POL-1001',
    holderName: 'Asha Rao',
    type: 'Health',
    premium: 4200,
    status: 'ACTIVE',
    renewalDate: '2025-03-15',
  },
  {
    id: 2,
    policyNumber: 'POL-1002',
    holderName: 'Vikram Shah',
    type: 'Life',
    premium: 12500,
    status: 'ACTIVE',
    renewalDate: '2025-06-01',
  },
  {
    id: 3,
    policyNumber: 'POL-1003',
    holderName: 'Meera Iyer',
    type: 'Motor',
    premium: 3100,
    status: 'PENDING',
    renewalDate: '2025-01-20',
  },
  {
    id: 4,
    policyNumber: 'POL-1004',
    holderName: 'Rohan Das',
    type: 'Home',
    premium: 5600,
    status: 'INACTIVE',
    renewalDate: '2025-09-10',
  },
  {
    id: 5,
    policyNumber: 'POL-1005',
    holderName: 'Priya Menon',
    type: 'Health',
    premium: 4800,
    status: 'ACTIVE',
    renewalDate: '2025-04-05',
  },
]

let nextId = policies.length + 1

async function list(params: ListPoliciesParams = {}): Promise<ListPoliciesResult> {
  if (!USE_MOCK) {
    const query = new URLSearchParams()
    if (params.page) query.set('page', String(params.page))
    if (params.pageSize) query.set('pageSize', String(params.pageSize))
    return apiRequest<ListPoliciesResult>(`/policies?${query.toString()}`)
  }

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? PAGE_SIZE
  const start = (page - 1) * pageSize
  const data = policies.slice(start, start + pageSize)
  return delay({ data, total: policies.length })
}

async function get(id: number): Promise<Policy | undefined> {
  if (!USE_MOCK) {
    return apiRequest<Policy>(`/policies/${id}`)
  }
  return delay(policies.find((policy) => policy.id === id))
}

async function create(input: PolicyInput): Promise<Policy> {
  if (!USE_MOCK) {
    return apiRequest<Policy>('/policies', { method: 'POST', body: input })
  }
  const created: Policy = { id: nextId++, ...input }
  policies = [created, ...policies]
  return delay(created)
}

async function update(id: number, input: PolicyInput): Promise<Policy> {
  if (!USE_MOCK) {
    return apiRequest<Policy>(`/policies/${id}`, { method: 'PUT', body: input })
  }
  policies = policies.map((policy) => (policy.id === id ? { ...policy, ...input, id } : policy))
  const updated = policies.find((policy) => policy.id === id)
  if (!updated) throw new Error(`Policy ${id} not found`)
  return delay(updated)
}

async function remove(id: number): Promise<void> {
  if (!USE_MOCK) {
    await apiRequest<void>(`/policies/${id}`, { method: 'DELETE' })
    return
  }
  policies = policies.filter((policy) => policy.id !== id)
  await delay(undefined)
}

export const policyApi = { list, get, create, update, remove }
