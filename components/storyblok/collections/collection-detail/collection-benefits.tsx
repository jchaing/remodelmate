import { storyblokEditable } from '@storyblok/react'
import {
  CalendarIcon,
  SwitchHorizontalIcon,
  TruckIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'

export const CollectionBenefits = ({ blok }: any) => {
  const collectionBenefits = blok.benefits[0].content?.body[0]

  const [benefits, setBenefits] = useState([
    {
      id: 1,
      icon: CalendarIcon,
      name: collectionBenefits?.benefit_1_name,
      description: collectionBenefits?.benefit_1_description,
    },
    {
      id: 2,
      icon: SwitchHorizontalIcon,
      name: collectionBenefits?.benefit_2_name,
      description: collectionBenefits?.benefit_2_description,
    },
    {
      id: 3,
      icon: TruckIcon,
      name: collectionBenefits?.benefit_3_name,
      description: collectionBenefits?.benefit_3_description,
    },
  ])

  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <h2 className="sr-only">Our perks</h2>
        <div className="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x lg:py-8">
          {benefits?.map((benefit: any) => (
            <div
              key={benefit.id}
              className="py-8 lg:w-1/3 lg:flex-none lg:py-0"
            >
              <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                <benefit.icon
                  className="h-8 w-8 flex-shrink-0 text-indigo-600"
                  aria-hidden="true"
                />
                <div className="ml-4 flex flex-auto flex-col-reverse">
                  <h3 className="font-medium text-gray-900">{benefit.name}</h3>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
