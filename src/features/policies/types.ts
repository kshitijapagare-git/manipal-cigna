export interface Policy {
  id: number
  policyNumber: string
  holderName: string
  type: string
  premium: number
  status: string
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
