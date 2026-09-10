import type { ReactNode } from 'react'

export interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  /** Set true for destructive actions (e.g. delete) to style the confirm button. */
  danger?: boolean
}

/**
 * Generic yes/no confirmation dialog. Intentionally has no knowledge of any
 * specific workflow — callers decide what "confirm" means.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
        <h2 id="confirm-dialog-title" className="text-base font-semibold text-surface-900">
          {title}
        </h2>
        {description ? <div className="mt-2 text-sm text-surface-600">{description}</div> : null}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-surface-300 px-3 py-1.5 text-sm font-medium text-surface-700 hover:bg-surface-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              danger
                ? 'rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700'
                : 'rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700'
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
