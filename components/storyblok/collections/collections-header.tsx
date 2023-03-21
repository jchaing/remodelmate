import { storyblokEditable } from '@storyblok/react'

export const CollectionsHeader = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
            {blok.sub_heading}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {blok.heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {blok.description}
          </p>
        </div>
      </div>
    </section>
  )
}
