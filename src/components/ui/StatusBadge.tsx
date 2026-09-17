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
  status: string | null | undefined
  /** Overrides the tone derived from `status`. */
  tone?: BadgeTone
  /** Overrides the visible label text. */
  label?: string
}

export function StatusBadge({ status, tone, label }: StatusBadgeProps) {
  const displayLabel = label ?? status ?? 'Unknown'
  const displayTone = tone ?? (status == null ? 'neutral' : toneForStatus(status))

  return <Badge tone={displayTone}>{displayLabel}</Badge>
}
