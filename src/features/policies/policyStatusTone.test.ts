import { describe, expect, it } from 'vitest'
import { toneForPolicyStatus } from './policyStatusTone'

describe('toneForPolicyStatus', () => {
  it('maps each STATUS_OPTIONS value to a distinct tone', () => {
    expect(toneForPolicyStatus('ACTIVE')).toBe('success')
    expect(toneForPolicyStatus('PENDING')).toBe('warning')
    expect(toneForPolicyStatus('INACTIVE')).toBe('neutral')
    expect(toneForPolicyStatus('CLOSED')).toBe('danger')
  })

  it('falls back to neutral for null/undefined/unrecognized values', () => {
    expect(toneForPolicyStatus(null)).toBe('neutral')
    expect(toneForPolicyStatus(undefined)).toBe('neutral')
    expect(toneForPolicyStatus('SOME_UNKNOWN')).toBe('neutral')
  })
})
