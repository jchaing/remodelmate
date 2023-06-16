/* eslint-disable @next/next/no-img-element */
import { render } from 'storyblok-rich-text-react-renderer'

export const BlogArticle = ({ blok }: any) => {
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
        <img
          className="  mb-10 w-full rounded object-cover object-center md:h-96"
          alt={blok.image.alt}
          src={blok.image.filename}
        />

        <div className="w-full text-center lg:w-2/3">
          <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            {blok.title}
          </h1>

          <h1 className="title-font mb-4 text-2xl font-medium text-gray-600 sm:text-3xl">
            {blok.subtitle}
          </h1>

          <div className="my-8 text-justify leading-relaxed">
            {render(blok.content)}
          </div>
        </div>
      </div>
    </section>
  )
}
