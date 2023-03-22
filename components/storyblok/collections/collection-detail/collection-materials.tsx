/* eslint-disable @next/next/no-img-element */
import { storyblokEditable } from '@storyblok/react'
import { useState } from 'react'

export const CollectionMaterials = ({ blok }: any) => {
  const [materials, setMaterials] = useState<any[]>([
    {
      id: 1,
      name: blok.material_1_name,
      description: blok.material_1_description,
      imageSrc: blok.material_1_image.filename,
      imageAlt: blok.material_1_image.alt,
    },
    {
      id: 2,
      name: blok.material_2_name,
      description: blok.material_2_description,
      imageSrc: blok.material_2_image.filename,
      imageAlt: blok.material_2_image.alt,
    },
    {
      id: 3,
      name: blok.material_3_name,
      description: blok.material_3_description,
      imageSrc: blok.material_3_image.filename,
      imageAlt: blok.material_3_image.alt,
    },
    {
      id: 4,
      name: blok.material_4_name,
      description: blok.material_4_description,
      imageSrc: blok.material_4_image.filename,
      imageAlt: blok.material_4_image.alt,
    },
  ])

  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-24 px-4 sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {blok.material_heading}
            </p>
            <p className="mt-4 text-gray-500">{blok.material_sub_heading}</p>
          </div>

          <div className="mt-11 grid grid-cols-1 items-start gap-y-16 gap-x-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {materials.map((material: any) => (
              <div key={material.name} className="flex flex-col-reverse">
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    {material.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {material.description}
                  </p>
                </div>
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={material.imageSrc}
                    alt={material.imageAlt}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
