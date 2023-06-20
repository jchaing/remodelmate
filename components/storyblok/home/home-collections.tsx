/* eslint-disable @next/next/no-img-element */
import { storyblokEditable } from "@storyblok/react"
import { ROUTE_MAP } from "@utils/routes"
import Link from "next/link"

export const HomeCollections = ({ blok }: any) => {
  return (
    <section
      aria-labelledby="collections-heading"
      className="bg-gray-100"
      {...storyblokEditable(blok)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2
            id="collections-heading"
            className="text-3xl font-bold text-gray-900"
          >
            {blok.heading}
          </h2>
          <Link href={ROUTE_MAP.app.collections}>
            <span className='cursor-pointer text-sky-700'>View all</span>
          </Link>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {blok.collections.map((collection: any) => (
              <div key={collection.uuid} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    alt={collection.content?.body[0].images[0].alt}
                    src={collection.content?.body[0].images[0].filename}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-base font-semibold text-gray-900">
                  <Link href={`collections/${collection.slug}`}>
                    <span className="absolute inset-0" />
                    {collection.content?.body[0].name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">
                  {collection.content?.body[0].teaser}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
