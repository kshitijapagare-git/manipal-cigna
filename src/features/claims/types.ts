export interface Claim {
  id: number
  claimNumber: string
  policyId: number
  description: string
  amount: number
  status: string
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
