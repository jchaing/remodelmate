import { PaymentToolTip } from '@components/shared'
import { SignUpForm, StripeForm } from '@components/stripe'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { Elements } from '@stripe/react-stripe-js'
import { Card } from '@stripe/stripe-js'
import { ROUTE_MAP } from '@utils/routes'
import { getStripe } from '@utils/stripe'
import Link from 'next/link'
import { FunctionComponent } from 'react'

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

  const expirationDateString = expirationDateUserTimezone.toLocaleString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  )

  return (
    <>
      {project && milestones && (
        <div className="mx-auto mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book your bathroom renovation
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* // INFO: MOBILE RENOVATION SUMMARY */}

            <div className="lg:hidden">
              <section
                aria-labelledby="renovation-summary"
                className="mb-8 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:-mt-4 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-xl font-semibold text-gray-900"
                >
                  Your Renovation Summary
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

                  {paymentMethod && (
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

                  <div className="flex items-center justify-between pt-4">
                    <dt className="text-base font-bold text-gray-900">
                      Due Today
                    </dt>
                    <dd className="text-base font-bold text-indigo-500">
                      ${milestones[0].price.toLocaleString('en')}
                    </dd>
                  </div>
                </dl>

                {stripeCustomerId && milestones && (
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

              {(!stripeCustomerId || !paymentMethod) &&
                firstName &&
                lastName &&
                email && (
                  <section
                    aria-labelledby="summary-heading"
                    className="my-8 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8"
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

            <section
              aria-labelledby="cart-heading"
              className="lg:col-span-6 xl:col-span-7"
            >
              <h2 id="cart-heading" className="sr-only">
                Your project milestones
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {/* // INFO: Mapping Over Milestones Array */}
                {milestones.map((milestone: Milestone) => (
                  // INFO: Milestone Id Used As Key Prop
                  <li key={milestone._id} className="flex py-3">
                    <div className="flex flex-1 flex-col px-2">
                      <div className="relative pr-9 sm:gap-x-6 sm:pr-0">
                        <div>
                          {/* // INFO: Milestone Name */}
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">
                              {milestone.name}
                            </h3>
                          </div>

                          {/* // INFO: Milestone Description */}
                          <p className="mt-1 text-sm font-normal text-gray-500">
                            {milestone.description}
                          </p>
                        </div>

                        {/* // INFO: Milestone Price */}

                        <div className="absolute top-0 right-0">
                          <p className="text-md font-medium">
                            ${milestone.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* // INFO: DESKTOP RENOVATION SUMMARY */}
            <div className="hidden lg:col-span-6 lg:block xl:col-span-5">
              <section className="rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:-mt-4 lg:p-8">
                <h2
                  id="summary-heading"
                  className="text-xl font-semibold text-gray-900"
                >
                  Your Renovation Summary
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

                  {paymentMethod && (
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
                      {/* <li>Excludes permits and finished materials.</li> */}
                      <li>Quote expires on {expirationDateString}.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <dt className="text-base font-bold text-gray-900">
                      Due Today
                    </dt>
                    <dd className="text-base font-bold text-indigo-500">
                      ${milestones[0].price.toLocaleString('en')}
                    </dd>
                  </div>
                </dl>

                {stripeCustomerId && milestones && paymentMethod && (
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

              {(!stripeCustomerId || !paymentMethod) &&
                firstName &&
                lastName &&
                email && (
                  <section
                    aria-labelledby="summary-heading"
                    className="my-8 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8"
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
