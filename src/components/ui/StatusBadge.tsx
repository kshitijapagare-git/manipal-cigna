import { Badge, type BadgeTone } from './Badge'

const TONES: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'danger']

/**
 * Deterministically maps an arbitrary free-text status string to one of a
 * small set of visual tones, purely by hashing the string. This is a
 * generic scaffold component — it has no knowledge of what any particular
 * status value "means" for any entity.
 */
function toneForStatus(status: string): BadgeTone {
  let hash = 0
  for (let i = 0; i < status.length; i++) {
    hash = (hash << 5) - hash + status.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % TONES.length
  return TONES[index]
}

export interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge tone={toneForStatus(status)}>{status}</Badge>
}
