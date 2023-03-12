import { storyblokEditable } from '@storyblok/react'
import Link from 'next/link'

export const CollectionRecommendations = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {blok.recommendation_name}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {blok.collections.map((collection: any) => (
              <div key={collection.uuid} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={collection.content?.body[0].images[0].filename}
                    alt={collection.content?.body[0].images[0].alt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/collections/${collection.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {collection.content?.body[0].name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {collection.content?.body[0].teaser}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {collection.content?.body[0].price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
