// import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'

import {
  CreditCardIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline'

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#', current: true },
  { name: 'Profile', icon: UserIcon, href: '#', current: false },
  { name: 'Payment', icon: CreditCardIcon, href: '#', current: false },
  { name: 'Sign-out', icon: LogoutIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DashboardNav = ({ children }) => {
  return (
    <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col overflow-y-auto pb-4 pt-5">
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? 'text-sky-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-6 w-6 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 md:px-8">
        {children}
      </div>
    </div>
  )
}
