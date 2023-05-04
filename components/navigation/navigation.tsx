/* eslint-disable @next/next/no-img-element */
import {
  Fragment,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { XIcon, MenuAlt3Icon } from '@heroicons/react/outline'
import { Footer } from '@components/footer'
import Link from 'next/link'
import { ROUTE_MAP } from '@utils/routes'
import { getStoryblokApi } from '@storyblok/react'
import Image from 'next/image'
import { ESTIMATE_URL, LOGIN_URL } from '@utils/links'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const Navigation: FunctionComponent<NavigationProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [collections, setCollections] = useState<any[]>([])

  const navigation = {
    categories: [
      {
        id: 'collections',
        name: 'Collections',
        featured: [...collections],
      },
    ],
    pages: [
      { name: 'Contractors', href: ROUTE_MAP.app.contractors },
      { name: 'About us', href: ROUTE_MAP.app.aboutUs },
    ],
  }

  useEffect(() => {
    const storyblokApi = getStoryblokApi()

    const getCollections = async () => {
      const sbParams: any = {
        version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
        starts_with: 'collections/',
        is_startpage: false,
      }

      const { data } = await storyblokApi.get('cdn/stories', sbParams)

      setCollections((prev) =>
        data.stories.slice(0, 6).map((collection: any) => {
          collection.content.slug = collection.slug
          return collection
        })
      )
    }

    getCollections()
  }, [])

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'border-sky-600 text-sky-600'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pt-10 pb-8"
                      >
                        <div className="grid grid-cols-2 gap-8">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                              onClick={() => setOpen(false)}
                            >
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  src={item.content.body[0].images[0].filename}
                                  alt={item.content.body[0].images[0].alt}
                                  className="object-cover object-center"
                                  width={128}
                                  height={128}
                                />
                              </div>
                              <Link
                                href={`/${item.full_slug}`}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center pb-4">
                          <Link
                            href={ROUTE_MAP.app.collections}
                            onClick={() => setOpen(false)}
                          >
                            <span className="text-md">
                              View all collections
                            </span>
                          </Link>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <Link
                      href={ROUTE_MAP.dashboard.entry}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      Account
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      href={ESTIMATE_URL}
                      className="-m-2 block p-2 font-medium text-gray-900"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      Get quote
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative min-h-screen overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuAlt3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href={ROUTE_MAP.app.entry}>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-4 w-auto"
                    src="https://remodelmate-v2-local.s3.us-east-2.amazonaws.com/branding/logos/wordmark/svg/remodelmate-black.svg"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-sky-600 text-sky-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full bg-white text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              {/* Fake border when menu is open */}
                              <div
                                className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                aria-hidden="true"
                              >
                                <div
                                  className={classNames(
                                    open ? 'bg-gray-200' : 'bg-transparent',
                                    'h-px w-full transition-colors duration-200 ease-out'
                                  )}
                                />
                              </div>

                              <div className="relative">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid gap-y-10 gap-x-8 py-16">
                                    <div className="grid grid-cols-6 gap-x-16">
                                      {category.featured.map((item) => (
                                        <Link
                                          href={`/${item.full_slug}`}
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                          onClick={() => close()}
                                        >
                                          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image
                                              src={
                                                item.content.body[0].images[0]
                                                  .filename
                                              }
                                              alt={
                                                item.content.body[0].images[0]
                                                  .alt
                                              }
                                              className="object-cover object-center"
                                              width={150}
                                              height={150}
                                            />
                                          </div>
                                          <div className="mt-6 block font-medium text-gray-900">
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-center pb-16">
                                    <Link
                                      href={ROUTE_MAP.app.collections}
                                      onClick={() => close()}
                                    >
                                      <span className="text-lg">
                                        View all collections
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href={ROUTE_MAP.dashboard.entry}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Account
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    href={ESTIMATE_URL}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <Footer />
      </header>
    </div>
  )
}

interface NavigationProps {
  children: ReactNode
}
