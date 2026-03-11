import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Profile', to: '/profile', icon: UserIcon },
  { name: 'Attendance', to: '/attendance', icon: CalendarIcon },
  { name: 'Grades', to: '/grades', icon: AcademicCapIcon },
  { name: 'Fees', to: '/fees', icon: CurrencyDollarIcon },
  { name: 'Timetable', to: '/timetable', icon: ClockIcon },
  { name: 'Library', to: '/library', icon: BookOpenIcon },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-royal-blue overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold text-white">School Portal</span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-200 text-royal-blue'
                        : 'text-white hover:bg-blue-600 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-blue-400 p-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-white">John Mutai</p>
                <p className="text-xs text-blue-200">Adm: 2024/001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header & main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with hamburger */}
        <div className="md:hidden bg-royal-blue border-b border-blue-400 px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none focus:text-blue-200"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-white">School Portal</span>
          <div className="w-6" />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-royal-blue">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-xl font-semibold text-white">School Portal</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-200 text-royal-blue'
                            : 'text-white hover:bg-blue-600 hover:text-white'
                        }`
                      }
                    >
                      <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-blue-400 p-4">
                <div className="flex items-center">
                  <div>
                    <p className="text-base font-medium text-white">John Mutai</p>
                    <p className="text-sm text-blue-200">Adm: 2024/001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  )
}