import { describe, expect, it } from 'vitest'
import { policyApi } from './policyApi'

describe('policyApi (mock)', () => {
  it('lists seeded policies with pagination metadata', async () => {
    const result = await policyApi.list({ page: 1, pageSize: 2 })
    expect(result.data).toHaveLength(2)
    expect(result.total).toBeGreaterThanOrEqual(5)
  })

  it('creates, reads, updates and removes a policy', async () => {
    const created = await policyApi.create({
      policyNumber: 'POL-TEST-1',
      holderName: 'Test Holder',
      type: 'Travel',
      premium: 100,
      status: 'ACTIVE',
      renewalDate: '2025-05-01',
    })
    expect(created.id).toBeDefined()

    const fetched = await policyApi.get(created.id)
    expect(fetched?.policyNumber).toBe('POL-TEST-1')

    const updated = await policyApi.update(created.id, {
      ...created,
      holderName: 'Updated Holder',
    })
    expect(updated.holderName).toBe('Updated Holder')

    await policyApi.remove(created.id)
    const afterRemove = await policyApi.get(created.id)
    expect(afterRemove).toBeUndefined()
  })
})
