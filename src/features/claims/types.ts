import type { ClaimStatus } from './claimStatuses'

export interface Claim {
  id: number
  claimNumber: string
  policyId: number
  description: string
  amount: number
  /** One of CLAIM_STATUSES — never a policy status, and never a free string. */
  status: ClaimStatus
}

export type ClaimInput = Omit<Claim, 'id'>

export interface ListClaimsParams {
  page?: number
  pageSize?: number
  /** Plain search against the `description` field only. */
  search?: string
}

export interface ListClaimsResult {
  data: Claim[]
  total: number
}
