/**
 * The complete set of status values a CLAIM can hold.
 *
 * Separate from the policy statuses in lib/constants.ts, and deliberately so: a claim moves
 * through a review lifecycle, a policy does not. The mock API seeds only these, and the claim
 * form offers only these.
 *
 * This file declares the vocabulary and nothing else. Which moves between these statuses are
 * legal, and what a user must confirm before making one, are workflow rules — they do not live
 * here.
 */
export const CLAIM_STATUSES = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'REJECTED',
  'SETTLED',
  'CLOSED',
] as const

/** A claim status. Use this rather than `string` wherever a claim status is held or compared. */
export type ClaimStatus = (typeof CLAIM_STATUSES)[number]

/** Sentence-case label for display; the stored value is always the SCREAMING_SNAKE form. */
export function claimStatusLabel(status: ClaimStatus): string {
  const words = status.toLowerCase().replace(/_/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}
