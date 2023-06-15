import { storyblokEditable } from '@storyblok/react'
import { ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'

export const HomeCta = ({ blok }: any) => {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative bg-gray-50"
      {...storyblokEditable(blok)}
    >
      <div className="bg-sky-600">
        <div className="mx-auto max-w-2xl py-16 px-6 text-center sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">{blok.heading}</span>
            <span className="block">{blok.sub_heading}</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-sky-200">{blok.message}</p>
          <Link
            href={ROUTE_MAP.app.collections}
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-sky-600 hover:bg-sky-50 sm:w-auto"
          >
            {blok.button_text}
          </Link>
        </div>
      </div>
    </section>
  )
}
