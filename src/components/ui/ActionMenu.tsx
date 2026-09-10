import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

export interface ActionMenuItem {
  label: string
  onSelect: () => void
  danger?: boolean
}

export interface ActionMenuProps {
  items: ActionMenuItem[]
  label?: string
}

/** Generic "⋯" dropdown menu of row actions (view / edit / delete / …). */
export function ActionMenu({ items, label = 'Actions' }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md px-2 py-1 text-surface-500 hover:bg-surface-100 hover:text-surface-700"
      >
        ⋯
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-1 w-36 rounded-md border border-surface-200 bg-white py-1 shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
              className={cn(
                'block w-full px-3 py-1.5 text-left text-sm hover:bg-surface-50',
                item.danger ? 'text-red-600' : 'text-surface-700',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
