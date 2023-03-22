/* eslint-disable @next/next/no-img-element */
import { getStoryblokApi, storyblokEditable } from '@storyblok/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const CollectionsGrid = ({ blok }: any) => {
  const [collections, setCollections] = useState<any[]>([])

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
        data.stories.map((collection: any) => {
          collection.content.slug = collection.slug
          return collection
        })
      )
    }

    getCollections()
  }, [])

  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
              {collections.map((collection: any) => (
                <div key={collection?.uuid} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={collection.content?.body[0].images[0].filename}
                      alt={collection.content?.body[0].images[0].alt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-gray-900">
                    <Link href={`/collections/${collection.content?.slug}`}>
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
      </div>
    </section>
  )
}
