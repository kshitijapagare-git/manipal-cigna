import { describe, expect, it } from 'vitest'
import { claimApi } from './claimApi'

describe('claimApi (mock)', () => {
  it('lists seeded claims with pagination metadata', async () => {
    const result = await claimApi.list({ page: 1, pageSize: 2 })
    expect(result.data).toHaveLength(2)
    expect(result.total).toBeGreaterThanOrEqual(5)
  })

  it('searches claims by description only', async () => {
    const result = await claimApi.list({ search: 'hospitalization' })
    expect(result.data.length).toBeGreaterThan(0)
    for (const claim of result.data) {
      expect(claim.description.toLowerCase()).toContain('hospitalization')
    }
  })

  it('filters claims by status', async () => {
    const result = await claimApi.list({ status: 'APPROVED' })
    expect(result.data.length).toBeGreaterThan(0)
    for (const claim of result.data) {
      expect(claim.status).toBe('APPROVED')
    }
  })

  it('filters claims by description and status together', async () => {
    const result = await claimApi.list({ search: 'damage', status: 'REJECTED' })
    expect(result.data.length).toBeGreaterThan(0)
    for (const claim of result.data) {
      expect(claim.description.toLowerCase()).toContain('damage')
      expect(claim.status).toBe('REJECTED')
    }

    // "damage" also appears in an APPROVED claim's description, so this combination proves the
    // status filter narrows results rather than the search term alone.
    const noMatch = await claimApi.list({ search: 'damage', status: 'SETTLED' })
    expect(noMatch.data).toHaveLength(0)
  })

  it('creates, reads, updates and removes a claim', async () => {
    const created = await claimApi.create({
      claimNumber: 'CLM-TEST-1',
      policyId: 1,
      description: 'Test claim description',
      amount: 500,
      status: 'SUBMITTED',
    })
    expect(created.id).toBeDefined()

    const fetched = await claimApi.get(created.id)
    expect(fetched?.claimNumber).toBe('CLM-TEST-1')

    const updated = await claimApi.update(created.id, {
      ...created,
      amount: 750,
    })
    expect(updated.amount).toBe(750)

    await claimApi.remove(created.id)
    const afterRemove = await claimApi.get(created.id)
    expect(afterRemove).toBeUndefined()
  })
})
