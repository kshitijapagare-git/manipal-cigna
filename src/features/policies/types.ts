import type { PolicyStatus } from '../../lib/constants'

export interface Policy {
  id: number
  policyNumber: string
  holderName: string
  type: string
  premium: number
  /** One of STATUS_OPTIONS — never a free string. See lib/constants.ts. */
  status: PolicyStatus
  /** ISO date string (YYYY-MM-DD) — the date this policy is next due for renewal. */
  renewalDate: string
}

export type PolicyInput = Omit<Policy, 'id'>

export interface ListPoliciesParams {
  page?: number
  pageSize?: number
}

export interface ListPoliciesResult {
  data: Policy[]
  total: number
}
