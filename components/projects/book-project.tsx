import { PaymentToolTip } from '@components/shared'
import { SignUpForm, StripeForm } from '@components/stripe'
import { Disclosure } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { collectionImages } from '@lib/images'
import { LayoutReversed } from '@lib/layout'
import { materials } from '@lib/materials'
import { Elements } from '@stripe/react-stripe-js'
import { Card } from '@stripe/stripe-js'
import { ROUTE_MAP } from '@utils/routes'
import { getStripe } from '@utils/stripe'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, Fragment } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const BookProject: FunctionComponent<BookProjectProps> = ({
  homeowner,
  project,
  milestones,
  paymentMethod,
}) => {
  const { firstName, lastName, email, stripeCustomerId } = homeowner
  const projectId = project._id
  const {
    collectionName,
    layout,
    totalCost,
    address: { street, city, state, zip, additional } = {} as any,
    dateCreated,
    _referredBy,
    referralCode,
  } = project

  const quoteDate = new Date(dateCreated)
  const currentDate = new Date()

  const expirationDate = new Date(quoteDate)
  expirationDate.setDate(expirationDate.getDate() + 7)
  expirationDate.setHours(23, 59, 59, 0)

  const expirationDateUserTimezone = new Date(expirationDate.toLocaleString())
  const quoteExpired = currentDate > expirationDateUserTimezone

  const expirationDateString = expirationDateUserTimezone.toLocaleString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  )

  const constructionList = [...milestones].splice(2)

  return (
    <>
      {project && milestones && (
        <div className="mx-auto mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book Your Renovation
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* // INFO: MOBILE RENOVATION SUMMARY */}

            <section
              aria-labelledby="cart-heading"
              className="lg:col-span-6 xl:col-span-7"
            >
              <div className="">
                <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-4 xl:gap-6">
                  <div className="group aspect-h-1 aspect-w-1 row-span-2 overflow-hidden rounded-lg">
                    <Image
                      src={collectionImages[collectionName][0]}
                      alt={`${collectionName} Image 1`}
                      className="object-cover object-center group-hover:opacity-75"
                      width={562.5}
                      height={750}
                      priority
                    />
                  </div>
                  <div className="group aspect-h-2 aspect-w-2 overflow-hidden rounded-lg sm:relative sm:aspect-none sm:h-full sm:max-h-44">
                    <Image
                      src={collectionImages[collectionName][1]}
                      alt={`${collectionName} Image 2`}
                      className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                      width={562.5}
                      height={750}
                      priority
                    />
                  </div>
                  <div className="group aspect-h-2 aspect-w-2 overflow-hidden rounded-lg sm:relative sm:aspect-none sm:h-full sm:max-h-44">
                    <Image
                      src={collectionImages[collectionName][2]}
                      alt={`${collectionName} Image 3`}
                      className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                      width={562.5}
                      height={750}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/**Collection Detail */}
              <div
                aria-labelledby="renovation-summary"
                className="my-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8"
              >
                <dl className="space-y-4">
                  <h2
                    id="summary-heading"
                    className="pb-2 text-xl font-semibold text-gray-900"
                  >
                    Renovation Details
                  </h2>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Collection</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {collectionName}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      Layout
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {layout}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Address</span>
                    </dt>

                    <dd className="text-sm font-medium text-gray-900">
                      {street} {additional}
                      <br />
                      {city}, {state} {zip}
                    </dd>
                  </div>
                </dl>
              </div>

              {/**Construction and Materials Info */}
              <div
                aria-labelledby="renovation-summary"
                className="my-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8"
              >
                <dl className="space-y-4">
                  <h2
                    id="summary-heading"
                    className="pb-2 text-xl font-semibold text-gray-900"
                  >
                    Renovation Breakdown
                  </h2>
                  <Disclosure as="div" defaultOpen={false}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between text-left">
                            <span
                              className={classNames(
                                open ? 'text-sky-600' : 'text-gray-600',
                                'text-sm'
                              )}
                            >
                              Construction
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="block h-4 w-4 text-sky-400 group-hover:text-sky-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="block h-4 w-4 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose-sm prose py-6"
                        >
                          <ul role="list">
                            {constructionList.map((milestone: any) => (
                              <Fragment key={milestone.name}>
                                <li className="font-semibold">
                                  {milestone.name}
                                </li>
                                <div className="ml-4 lg:ml-6">
                                  {milestone.description}
                                </div>
                              </Fragment>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure as="div" defaultOpen={false}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between border-t border-gray-300 pt-4 text-left">
                            <span
                              className={classNames(
                                open ? 'text-sky-600' : 'text-gray-600',
                                'text-sm'
                              )}
                            >
                              Materials
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="block h-4 w-4 text-sky-400 group-hover:text-sky-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="block h-4 w-4 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose-sm prose py-6"
                        >
                          <ul role="list">
                            {materials[collectionName][
                              LayoutReversed[layout]
                            ].map((milestone: any) => (
                              <Fragment key={milestone.name}>
                                <li className="font-semibold">
                                  {milestone.name}
                                </li>
                                <div className="ml-4 lg:ml-6">
                                  {milestone.description}
                                </div>
                              </Fragment>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </dl>
              </div>

              {/* // INFO: MOBILE RENOVATION SUMMARY */}
              <div className="lg:hidden">
                <section
                  aria-labelledby="renovation-summary"
                  className="mb-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:-mt-4 lg:p-8"
                >
                  <h2
                    id="summary-heading"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Price Details
                  </h2>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Construction</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $
                        {(
                          totalCost -
                          (milestones[0].price + milestones[1].price)
                        ).toLocaleString('en')}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                      <dt className="flex items-center text-sm text-gray-600">
                        {milestones[1]._category === 'materials' ? (
                          <span>Materials</span>
                        ) : (
                          <span>3D Design</span>
                        )}
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${milestones[1].price.toLocaleString('en')}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                      <dt className="flex text-sm text-gray-600">
                        <span>Reservation</span>
                      </dt>

                      <dd className="text-sm font-medium text-gray-900">
                        ${milestones[0].price.toLocaleString('en')}
                      </dd>
                    </div>
                    <div className="prose-sm prose mt-4 text-gray-500">
                      <ul role="list">
                        <li>Non-refundable order fee.</li>
                        <li>
                          Includes warehousing and consolidated delivery for
                          your {collectionName} Collection.
                        </li>
                      </ul>
                    </div>

                    {referralCode ? (
                      <div>
                        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                          <dt className="flex text-sm text-gray-600">
                            <span>Reservation</span>
                          </dt>
                        </div>
                        <div className="prose-sm prose mt-4 text-gray-500">
                          <ul role="list">
                            <li>{`${_referredBy?.firstName} ${_referredBy?.lastName}`}</li>
                            <li>{referralCode}</li>
                          </ul>
                        </div>
                      </div>
                    ) : null}

                    {paymentMethod.last4 && (
                      <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                          <dt className="flex text-sm text-gray-600">
                            <span>Payment Method</span>
                            <span className="ml-2">
                              <PaymentToolTip text="☝🏽 Click to update your payment method">
                                <Link
                                  href={ROUTE_MAP.dashboard.payment}
                                  className="flex-shrink-0 text-gray-400 hover:text-indigo-200"
                                >
                                  <InformationCircleIcon className="h-5 w-5" />
                                </Link>
                              </PaymentToolTip>
                            </span>
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            <span className="font-normal text-gray-600">
                              {paymentMethod.brand
                                ? paymentMethod.brand.toUpperCase()
                                : 'CARD'}{' '}
                              ending in
                            </span>
                            <span className="ml-1 font-normal text-gray-600">
                              {paymentMethod.last4}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    )}

                    <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                      <dt className="text-base font-medium text-gray-900">
                        Your bathroom renovation
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${totalCost.toLocaleString('en')}
                      </dd>
                    </div>
                    <div className="prose-sm prose mt-4 text-gray-500">
                      <ul role="list">
                        <li>Quote expires on {expirationDateString}.</li>
                      </ul>
                    </div>

                    {quoteExpired ? (
                      <p className="inline-flex w-full justify-center pt-2 text-base font-bold text-indigo-500">
                        Quote Expired
                      </p>
                    ) : (
                      <div className="flex items-center justify-between pt-4">
                        <dt className="text-base font-bold text-gray-900">
                          Due Today
                        </dt>
                        <dd className="text-base font-bold text-indigo-500">
                          ${milestones[0].price.toLocaleString('en')}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {stripeCustomerId && milestones && paymentMethod.last4 && (
                    <div className="mt-6">
                      {expirationDateUserTimezone > currentDate ? (
                        <Elements stripe={getStripe()}>
                          <StripeForm
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            customerId={stripeCustomerId}
                            projectId={projectId}
                            milestoneId={milestones[0]._id}
                            milestonePrice={milestones[0].price}
                            milestoneName={milestones[0].name}
                          />
                        </Elements>
                      ) : (
                        <div className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white opacity-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          Expired
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>

              {/** PAYMENT DETAIL */}
              <div>
                {(!stripeCustomerId || !paymentMethod.last4) &&
                  firstName &&
                  lastName &&
                  email &&
                  !quoteExpired && (
                    <section
                      aria-labelledby="summary-heading"
                      className="my-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8"
                    >
                      <Elements stripe={getStripe()}>
                        <SignUpForm
                          firstName={firstName}
                          lastName={lastName}
                          email={email}
                          projectId={projectId}
                        />
                      </Elements>
                    </section>
                  )}
              </div>
            </section>

            {/* // INFO: DESKTOP RENOVATION SUMMARY */}
            <div className="hidden lg:col-span-6 lg:block xl:col-span-5">
              <section className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8">
                <h2
                  id="summary-heading"
                  className="text-xl font-semibold text-gray-900"
                >
                  Price Details
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Construction</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $
                      {(
                        totalCost -
                        (milestones[0].price + milestones[1].price)
                      ).toLocaleString('en')}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      {milestones[1]._category === 'materials' ? (
                        <span>Materials</span>
                      ) : (
                        <span>3D Design</span>
                      )}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${milestones[1].price.toLocaleString('en')}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Reservation</span>
                    </dt>

                    <dd className="text-sm font-medium text-gray-900">
                      ${milestones[0].price.toLocaleString('en')}
                    </dd>
                  </div>
                  <div className="prose-sm prose mt-4 text-gray-500">
                    <ul role="list">
                      <li>Non-refundable order fee.</li>
                      <li>
                        Includes warehousing and consolidated delivery for your{' '}
                        {collectionName} Collection.
                      </li>
                    </ul>
                  </div>

                  {referralCode ? (
                    <div>
                      <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                        <dt className="flex text-sm text-gray-600">
                          <span>Referral</span>
                        </dt>
                      </div>
                      <div className="prose-sm prose mt-4 text-gray-500">
                        <ul role="list">
                          <li>{`${_referredBy?.firstName} ${_referredBy?.lastName}`}</li>
                          <li>{referralCode}</li>
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  {paymentMethod.last4 && (
                    <dl className="mt-6 space-y-4">
                      <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                        <dt className="flex text-sm text-gray-600">
                          <span>Payment Method</span>
                          <span className="ml-2">
                            <PaymentToolTip text="☝🏽 Click to update your payment method">
                              <Link
                                href="/profile"
                                className="flex-shrink-0 text-gray-400 hover:text-indigo-200"
                              >
                                <InformationCircleIcon className="h-5 w-5" />
                              </Link>
                            </PaymentToolTip>
                          </span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          <span className="font-normal text-gray-600">
                            {paymentMethod.brand
                              ? paymentMethod.brand.toUpperCase()
                              : 'CARD'}{' '}
                            ending in
                          </span>
                          <span className="ml-1 font-normal text-gray-600">
                            {paymentMethod.last4}
                          </span>
                        </dd>
                      </div>
                    </dl>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Your bathroom renovation
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${totalCost.toLocaleString('en')}
                    </dd>
                  </div>
                  <div className="prose-sm prose mt-4 text-gray-500">
                    <ul role="list">
                      <li>Quote expires on {expirationDateString}.</li>
                    </ul>
                  </div>

                  {quoteExpired ? (
                    <p className="inline-flex w-full justify-center pt-2 text-base font-bold text-indigo-500">
                      Quote Expired
                    </p>
                  ) : (
                    <div className="flex items-center justify-between pt-4">
                      <dt className="text-base font-bold text-gray-900">
                        Due Today
                      </dt>
                      <dd className="text-base font-bold text-indigo-500">
                        ${milestones[0].price.toLocaleString('en')}
                      </dd>
                    </div>
                  )}
                </dl>

                {stripeCustomerId && milestones && paymentMethod.last4 && (
                  <div className="mt-6">
                    {expirationDateUserTimezone > currentDate ? (
                      <Elements stripe={getStripe()}>
                        <StripeForm
                          firstName={firstName}
                          lastName={lastName}
                          email={email}
                          customerId={stripeCustomerId}
                          projectId={projectId}
                          milestoneId={milestones[0]._id}
                          milestonePrice={milestones[0].price}
                          milestoneName={milestones[0].name}
                        />
                      </Elements>
                    ) : (
                      <div className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white opacity-50 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Expired
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface BookProjectProps {
  homeowner: Homeowner
  project: Estimate
  milestones: Milestone[]
  paymentMethod?: Card
}
