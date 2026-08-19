import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Projects', path: '/projects', icon: '📁' },
  { label: 'Tasks', path: '/tasks', icon: '✅' },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-lg font-bold tracking-wide">PM Tool</h1>
        <p className="text-xs text-slate-400">Project Management</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-500">
        v1.0.0 — Internship Project
      </div>
    </aside>
  )
}

export default Sidebar