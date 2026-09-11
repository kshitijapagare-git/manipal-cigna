import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/policies', label: 'Policies' },
  { to: '/claims', label: 'Claims' },
]

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-surface-200 bg-white">
      <div className="px-4 py-5">
        <p className="text-lg font-semibold text-surface-900">Insurance Portal</p>
      </div>
      <nav className="flex flex-col gap-1 px-2" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 text-sm font-medium text-surface-600 hover:bg-surface-100 hover:text-surface-900',
                isActive &&
                  'bg-primary-50 text-primary-700 hover:bg-primary-50 hover:text-primary-700',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
