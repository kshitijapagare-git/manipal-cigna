import { useState, type ReactNode } from 'react'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
}

/** Minimal hover/focus tooltip — no external positioning library needed. */
export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-surface-900 px-2 py-1 text-xs text-white shadow-lg"
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
