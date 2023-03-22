import { storyblokEditable } from '@storyblok/react'
import { ESTIMATE_URL } from '@utils/links'
import Image from 'next/image'
import Link from 'next/link'

export const HomeHero = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="relative overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {blok.headline} <br />
                {blok.sub_headline}
              </h1>
              <p className="mt-4 text-xl text-gray-500">{blok.message}</p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            src={blok.images[0].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[1].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[2].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[3].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[4].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[5].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={blok.images[6].filename}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={176}
                            height={256}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={ESTIMATE_URL}
                  className="inline-block rounded-md border border-transparent bg-sky-600 py-3 px-8 text-center font-medium text-white hover:bg-sky-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {blok.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
