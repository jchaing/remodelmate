import { storyblokEditable } from '@storyblok/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const AboutUsStory = ({ blok }: any) => {
  const stories = [
    {
      title: blok.founding_story_title_1,
      description: blok.founding_story_description_1,
      imageSrc:
        blok.founding_story_image_1.filename,
      imageAlt:
        blok.founding_story_image_1.alt,
    },
    {
      title: blok.founding_story_title_2,
      description: blok.founding_story_description_2,
      imageSrc:
        blok.founding_story_image_2.filename,
      imageAlt: blok.founding_story_image_2.alt,
    },
  ]

  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {blok.founding_story_heading}
            </h2>
            <p className="mt-4 text-gray-500">
              {blok.founding_story_sub_heading}
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {stories.map((story, storyIdx) => (
              <div
                key={story.title}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    storyIdx % 2 === 0
                      ? 'lg:col-start-1'
                      : 'lg:col-start-8 xl:col-start-9',
                    'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                  )}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {story.description}
                  </p>
                </div>
                <div
                  className={classNames(
                    storyIdx % 2 === 0
                      ? 'lg:col-start-6 xl:col-start-5'
                      : 'lg:col-start-1',
                    'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                  )}
                >
                  <div className="aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={story.imageSrc}
                      alt={story.imageAlt}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
