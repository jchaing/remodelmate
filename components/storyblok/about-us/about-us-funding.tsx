/* eslint-disable @next/next/no-img-element */
import { storyblokEditable } from '@storyblok/react'

export const AboutUsFunding = ({ blok }: any) => {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
          <p className="text-center text-lg font-semibold text-gray-600">
            {blok.funding_heading}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
            {blok.funding_images.map((image: any) => (
              <div key={image.id} className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
                <img
                  className="max-h-12"
                  src={image.filename}
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
