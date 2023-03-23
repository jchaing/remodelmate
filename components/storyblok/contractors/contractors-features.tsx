/* eslint-disable @next/next/no-img-element */
import {
  InboxIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import { storyblokEditable } from '@storyblok/react'
import { CONTRACTOR_URL } from '@utils/links'
import Link from 'next/link'

export const ContractorsFeatures = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600">
                    <InboxIcon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {blok.feature_1_name}
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    {blok.feature_1_description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={CONTRACTOR_URL}
                      className="inline-flex rounded-lg bg-sky-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-700 hover:ring-sky-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {blok.feature_1_button_text}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <blockquote>
                  <div>
                    <p className="text-base text-gray-500">
                      {blok.testimonial_heading}
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
                        {blok.testimonial_sub_heading}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={blok.feature_1_image.filename}
                  alt={blok.feature_1_image.alt}
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
                    <SparklesIcon
                      className="h-8 w-8 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {blok.feature_2_name}
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    {blok.feature_2_description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={CONTRACTOR_URL}
                      className="inline-flex rounded-lg bg-sky-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-sky-600 hover:bg-sky-700 hover:ring-sky-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {blok.feature_2_button_text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src={blok.feature_2_image.filename}
                  alt={blok.feature_2_image.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}