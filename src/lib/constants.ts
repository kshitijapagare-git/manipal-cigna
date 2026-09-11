/**
 * Generic, domain-agnostic constants shared across the app.
 */

export const PAGE_SIZE = 10

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const

/**
 * The complete set of status values a POLICY can hold.
 *
 * Authoritative, not a placeholder: `PolicyStatus` below is derived from it, `Policy['status']`
 * is typed by it, the policy form renders exactly these, and the mock API seeds only these.
 * Anything that reads, renders or branches on a policy status must use these strings verbatim —
 * there is no other set and no other casing. A requirement that names a status not in this list
 * is a question to resolve, never a licence to add a fifth one here or to map it to whichever
 * of these looks closest.
 *
 * Claims have their own, separate vocabulary — see features/claims/claimStatuses.ts.
 */
export const STATUS_OPTIONS = ['ACTIVE', 'PENDING', 'INACTIVE', 'CLOSED'] as const

/** A policy status. Use this rather than `string` wherever a policy status is held or compared. */
export type PolicyStatus = (typeof STATUS_OPTIONS)[number]

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/** Simulated network latency (ms) used by the in-memory mock APIs. */
export const MOCK_LATENCY_MS = 250
