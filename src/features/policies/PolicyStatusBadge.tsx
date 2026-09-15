import { Badge, type BadgeTone } from '../../components/ui/Badge'
import type { PolicyStatus } from '../../lib/constants'

/**
 * Fixed, explicit status→tone mapping for policy statuses — deliberately not the generic
 * hash-based StatusBadge, since that gives no guarantee of a stable colour per status.
 * Covers every value in STATUS_OPTIONS exhaustively.
 */
const POLICY_STATUS_TONES: Record<PolicyStatus, BadgeTone> = {
  ACTIVE: 'success',
  PENDING: 'warning',
  INACTIVE: 'neutral',
  CLOSED: 'danger',
}

export interface PolicyStatusBadgeProps {
  status: PolicyStatus
}

/** Display-only, colour-coded badge for a policy's status. */
export function PolicyStatusBadge({ status }: PolicyStatusBadgeProps) {
  return <Badge tone={POLICY_STATUS_TONES[status]}>{status}</Badge>
}
