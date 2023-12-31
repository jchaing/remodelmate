/* eslint-disable @next/next/no-img-element */
import { ClipboardCheckIcon, CreditCardIcon } from '@heroicons/react/outline'
import { storyblokEditable } from '@storyblok/react'
import { ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'

export const HomeFeature = ({ blok }: any) => {
  return (
    <section
      aria-labelledby="alternating-feature-sections-heading"
      className="relative"
      {...storyblokEditable(blok)}
    >
      <div className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600">
                    <ClipboardCheckIcon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {blok.feature1_heading}
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    {blok.feature1_message}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={ROUTE_MAP.app.collections}
                      className="inline-block rounded-md border border-transparent bg-sky-600 py-3 px-8 text-center font-medium text-white hover:bg-sky-700"
                    >
                      {blok.feature1_button_text}
                    </Link>
                  </div>
                </div>
              </div>
              {/** //TODO: Add testimonial? */}
              {/* <div className="mt-8 border-t border-gray-200 pt-6">
                <blockquote>
                  <div>
                    <p className="text-base text-gray-500">
                      &ldquo;Cras velit quis eros eget rhoncus lacus ultrices
                      sed diam. Sit orci risus aenean curabitur donec aliquet.
                      Mi venenatis in euismod ut.&rdquo;
                    </p>
                  </div>
                  <footer className="mt-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-6 w-6 rounded-full"
                          src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                          alt=""
                        />
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Marcia Hill, Digital Marketing Manager
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div> */}
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={blok.feature1_image.filename}
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600">
                    <CreditCardIcon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {blok.feature2_heading}
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    {blok.feature2_message}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={ROUTE_MAP.app.collections}
                      className="inline-block rounded-md border border-transparent bg-sky-600 py-3 px-8 text-center font-medium text-white hover:bg-sky-700"
                    >
                      {blok.feature2_button_text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={blok.feature2_image.filename}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
