import { ChevronRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { storyblokEditable } from '@storyblok/react'

export const ContractorsHero = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <main className=" bg-gray-900 p-16">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <div className="hidden sm:mb-4 sm:flex sm:justify-center lg:justify-start">
                  <a
                    href="https://contractor.remodelmate.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center rounded-full bg-gray-900 p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                  >
                    <span className="rounded-full bg-indigo-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                      {blok.pill}
                    </span>
                    <span className="ml-4 text-sm">{blok.sub_pill}</span>
                    <ChevronRightIcon
                      className="ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  {blok.heading}
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {blok.sub_heading}
                </p>
                <p className="mt-8 text-base font-semibold text-white sm:mt-10">
                  Used by
                </p>
                <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                        alt="Tuple"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                        alt="Workcation"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                        alt="StaticKit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                <div className="px-6 py-8 sm:px-10">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Sign in with
                    </p>

                    <div className="mt-1 grid grid-cols-3 gap-3">
                      <div>
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                        >
                          <span className="sr-only">Sign in with Facebook</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                        >
                          <span className="sr-only">Sign in with Twitter</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                        >
                          <span className="sr-only">Sign in with GitHub</span>
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <form action="#" method="POST" className="space-y-6">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          placeholder="Full name"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile-or-email" className="sr-only">
                          Mobile number or email
                        </label>
                        <input
                          type="text"
                          name="mobile-or-email"
                          id="mobile-or-email"
                          autoComplete="email"
                          placeholder="Mobile number or email"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create your account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-6 sm:px-10">
                  <p className="text-xs leading-5 text-gray-500">
                    By signing up, you agree to our{' '}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Terms
                    </a>
                    ,{' '}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Data Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Cookies Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}