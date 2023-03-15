import { storyblokEditable } from "@storyblok/react"

export const TOSHeader = ({ blok }: any) => {
  return (
    <header {...storyblokEditable(blok)}>
      <div className="bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {blok.tos_heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {blok.tos_sub_heading}
          </p>
        </div>
      </div>
    </header>
  )
}
