import { type BadgeTone } from '../../components/ui/Badge'
import { STATUS_OPTIONS, type PolicyStatus } from '../../lib/constants'

const STATUS_TONE_MAP: Record<PolicyStatus, BadgeTone> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'neutral',
  CLOSED: 'danger',
}

/**
 * Converts a policy status value into a deterministic badge tone.
 * Falls back to 'neutral' for null/undefined or any unrecognized value.
 */
export function toneForPolicyStatus(status: string | null | undefined): BadgeTone {
  if (status == null) return 'neutral'

  // `STATUS_OPTIONS` is small, so a simple membership check is fine and keeps the
  // function robust against unknown backend values.
  if ((STATUS_OPTIONS as readonly string[]).includes(status)) {
    return STATUS_TONE_MAP[status as PolicyStatus]
  }

  return 'neutral'
}
