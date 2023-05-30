// import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'

import { Loader } from '@components/shared'
import {
  CreditCardIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { magic } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const navigation = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    icon: HomeIcon,
    href: ROUTE_MAP.dashboard.entry,
    current: true,
  },
  {
    name: 'Profile',
    key: 'profile',
    icon: UserIcon,
    href: ROUTE_MAP.dashboard.profile,
    current: false,
  },
  {
    name: 'Payment',
    key: 'payment',
    icon: CreditCardIcon,
    href: ROUTE_MAP.dashboard.payment,
    current: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DashboardNav = ({ children }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', href: ROUTE_MAP.dashboard.entry },
    { id: 'profile', name: 'Profile', href: ROUTE_MAP.dashboard.profile },
    { id: 'payment', name: 'Payment', href: ROUTE_MAP.dashboard.payment },
    { id: 'sign-out', name: 'Sign-out' },
  ]

  const [logoutLoading, setLogoutLoading] = useState<boolean>(false)

  const router = useRouter()

  const logout = async () => {
    setLogoutLoading(true)

    await magic.user.logout()

    setLogoutLoading(false)

    await router.replace(ROUTE_MAP.app.entry)
  }

  const handleTabSelect = (e: any) => {
    switch (e.target.value) {
      case 'sign-out':
        logout()
        break
      case 'dashboard':
        router.push(ROUTE_MAP.dashboard.entry)
        break
      case 'profile':
        router.push(ROUTE_MAP.dashboard.profile)
        break
      case 'payment':
        router.push(ROUTE_MAP.dashboard.payment)
        break
      default:
        router.push(ROUTE_MAP.dashboard.entry)
        break
    }
  }

  const splitPath = router.pathname.split('/')
  const activePath = splitPath[splitPath.length - 1]

  return (
    <>
      {/**Mobile Dropdown Nav */}
      <div className="mx-auto mt-8 max-w-xl px-4 sm:px-6 md:hidden lg:px-8">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={activePath}
          onChange={handleTabSelect}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/**Desktop Side Bar */}
      <div className="sm:mx-auto sm:flex sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="hidden overflow-y-auto pb-4 pt-5 md:flex md:flex-col">
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.key === activePath
                      ? 'border-transparent text-sky-500'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.key === activePath
                        ? 'text-sky-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
              <button
                className={classNames(
                  'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                )}
                onClick={() => logout()}
              >
                <LogoutIcon
                  className={classNames(
                    logoutLoading
                      ? 'text-sky-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-6 w-6 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {logoutLoading ? 'Loading...' : 'Sign-out'}
              </button>
            </nav>
          </div>
        </div>
        <div className="mx-auto px-4 pt-5 sm:w-5/6 sm:px-0 md:px-6">
          {children}
        </div>
      </div>
    </>
  )
}
