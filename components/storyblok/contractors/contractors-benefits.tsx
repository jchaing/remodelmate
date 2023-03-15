import {
  CashIcon,
  ClockIcon,
  LibraryIcon,
} from '@heroicons/react/outline'
import { storyblokEditable } from '@storyblok/react'

export const ContractorsBenefits = ({ blok }: any) => {
  const benefits = [
    {
      name: blok.benefit_1_name,
      description: blok.benefit_1_description,
      icon: ClockIcon,
    },
    {
      name: blok.benefit_2_name,
      description: blok.benefit_2_description,
      icon: LibraryIcon,
    },
    {
      name: blok.benefit_3_name,
      description: blok.benefit_3_description,
      icon: CashIcon,
    },
  ]

  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">A better way to send money.</h2>
          <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name}>
                <dt>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                    <benefit.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {benefit.name}
                  </p>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
