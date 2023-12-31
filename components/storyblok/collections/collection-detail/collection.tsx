/* eslint-disable @next/next/no-img-element */
import { storyblokEditable } from '@storyblok/react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { useState } from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { CollectionForm } from './collection-form'
import Image from 'next/image'
import Head from 'next/head'

// const product = {
//   name: 'Zip Tote Basket',
//   price: '$140',
//   images: [
//     {
//       id: 1,
//       name: 'Angled view',
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
//       alt: 'Angled front view with bag zipped and handles upright.',
//     },
//     {
//       id: 2,
//       name: 'Angled view',
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
//       alt: 'Angled front view with bag zipped and handles upright.',
//     },
//     {
//       id: 3,
//       name: 'Angled view',
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
//       alt: 'Angled front view with bag zipped and handles upright.',
//     },
//     {
//       id: 4,
//       name: 'Angled view',
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
//       alt: 'Angled front view with bag zipped and handles upright.',
//     },
//     // More images...
//   ],
//   colors: [
//     {
//       name: 'Washed Black',
//       bgColor: 'bg-gray-700',
//       selectedColor: 'ring-gray-700',
//     },
//     { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
//     {
//       name: 'Washed Gray',
//       bgColor: 'bg-gray-500',
//       selectedColor: 'ring-gray-500',
//     },
//   ],
//   description: `
//     <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
//   `,
//   details: [
//     {
//       name: 'Features',
//       items: [
//         'Multiple strap configurations',
//         'Spacious interior with top zip',
//         'Leather handle and tabs',
//         'Interior dividers',
//         'Stainless strap loops',
//         'Double stitched construction',
//         'Water-resistant',
//       ],
//     },
//     // More sections...
//   ],
// }

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const Collection = ({ blok }: any) => {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [openForm, setOpenForm] = useState<boolean>(false)
  const handleClick = (e) => {
    e.preventDefault()
    setOpenForm(!openForm)
  }

  return (
    <>
      <Head>
        <title>{`${blok.name} - Collections | Remodelmate`}</title>
      </Head>
      <section {...storyblokEditable(blok)}>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {blok.images.map((image: any) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only"> {image.alt} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                src={image.filename}
                                alt=""
                                className="h-full w-full object-cover object-center"
                                width={130}
                                height={96}
                              />
                            </span>
                            <span
                              className={classNames(
                                selected ? 'ring-sky-500' : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                    <Tab className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                      <span className="sr-only">360 Degree SVG Icon</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <img
                          src={blok.virtual_360_svg?.filename}
                          alt=""
                          className="h-full w-full"
                        />
                      </span>
                    </Tab>
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                  {blok.images.map((image: any) => (
                    <Tab.Panel key={image.id}>
                      <Image
                        src={image.filename}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                        width={592}
                        height={592}
                      />
                    </Tab.Panel>
                  ))}
                  <Tab.Panel>
                    <iframe
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                      frameBorder="0"
                      allowFullScreen
                      allow="xr-spatial-tracking; gyroscope; accelerometer"
                      scrolling="no"
                      src={blok.virtual_360_tour.url}
                    ></iframe>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {blok.name}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Price</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    Starting at {blok.price}
                  </p>
                  <p className="mt-1 text-xs tracking-tight">
                    * Includes labor and materials for the Powder Room layout
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: blok.description }}
                  />
                </div>

                <form className="mt-6">
                  {/* Colors */}
                  {/* <div>
                  <h3 className="text-sm text-gray-600">Color</h3>
                  
                  <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                  >
                  <RadioGroup.Label className="sr-only">
                  {' '}
                  Choose a color{' '}
                  </RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <RadioGroup.Option
                    key={color.name}
                    value={color}
                    className={({ active, checked }) =>
                    classNames(
                      color.selectedColor,
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                      )
                    }
                    >
                    <RadioGroup.Label as="span" className="sr-only">
                    {' '}
                    {color.name}{' '}
                    </RadioGroup.Label>
                    <span
                    aria-hidden="true"
                    className={classNames(
                      color.bgColor,
                      'h-8 w-8 rounded-full border border-black border-opacity-10'
                      )}
                      />
                      </RadioGroup.Option>
                      ))}
                      </span>
                  </RadioGroup>
                </div> */}

                  <div className="sm:flex-col1 mt-14 flex">
                    <button
                      // type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                      onClick={handleClick}
                    >
                      {blok.button_text}
                    </button>
                  </div>
                </form>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="divide-y divide-gray-200 border-t">
                    {/* {product.details.map((detail) => ( */}
                    <Disclosure as="div" defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? 'text-sky-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {blok.details_name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-sky-400 group-hover:text-sky-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose-sm prose pb-6"
                          >
                            <ul role="list">
                              {blok.details_list.items.map((item: any) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/* ))} */}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollectionForm
        openForm={openForm}
        setOpenForm={setOpenForm}
        collectionName={blok.name}
      />
    </>
  )
}
