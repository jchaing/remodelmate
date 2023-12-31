import { storyblokEditable } from '@storyblok/react'
import Head from 'next/head'

export const AboutUsHero = ({ blok }: any) => {
  return (
    <>
      <Head>
        <title>{`About Us | Remodelmate`}</title>
      </Head>
      <section {...storyblokEditable(blok)}>
        <div className="bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* <p className="text-lg font-semibold leading-8 tracking-tight text-sky-600">
            Get the help you need
          </p> */}
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {blok.hero_heading}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {blok.hero_sub_heading}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
