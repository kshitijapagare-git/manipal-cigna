/**
 * Generic, domain-agnostic constants shared across the app.
 */

export const PAGE_SIZE = 10

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const

/**
 * Free-text status options offered in forms. These are intentionally
 * generic placeholders and are NOT tied to any specific workflow or
 * transition rules — they exist only so the create/edit forms have
 * something sensible to pick from.
 */
export const STATUS_OPTIONS = ['ACTIVE', 'PENDING', 'INACTIVE', 'CLOSED'] as const

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

/** Simulated network latency (ms) used by the in-memory mock APIs. */
export const MOCK_LATENCY_MS = 250
