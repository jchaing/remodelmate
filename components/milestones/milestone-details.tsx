import {
  ContractorModal,
  ImageEnlarge,
  PaymentToolTip,
} from '@components/shared'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@utils/stripe'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import MilestonePaymentForm from './milestone-payment-form'

enum MilestoneStatus {
  NOT_STARTED = 'notStarted',
  IN_PROGRESS = 'inProgress',
  PENDING_REVIEW = 'pendingReview',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

const getText = {
  [MilestoneStatus.NOT_STARTED]: 'Not Started',
  [MilestoneStatus.IN_PROGRESS]: 'In Progress',
  [MilestoneStatus.PENDING_REVIEW]: 'Pending',
  [MilestoneStatus.REJECTED]: 'Rejected',
  [MilestoneStatus.APPROVED]: 'Approved',
}

const getColor = {
  [MilestoneStatus.NOT_STARTED]: 'bg-trueGray-500 border-trueGray-500',
  [MilestoneStatus.IN_PROGRESS]: 'bg-yellow-500 border-yellow-500',
  [MilestoneStatus.PENDING_REVIEW]: 'bg-blue-500 border-blue-500',
  [MilestoneStatus.REJECTED]: 'bg-red-500 border-red-500',
  [MilestoneStatus.APPROVED]: 'bg-emerald-500 border-emerald-500',
}

const getAction = {
  [MilestoneStatus.NOT_STARTED]: 'View Details',
  [MilestoneStatus.IN_PROGRESS]: 'View Details',
  [MilestoneStatus.PENDING_REVIEW]: 'Review & Pay',
  [MilestoneStatus.REJECTED]: 'Under Review',
  [MilestoneStatus.APPROVED]: 'View Receipt',
}

const Images: FunctionComponent<ImagesProps> = ({ milestone }) => {
  const [imgSrc, setImgSrc] = useState('')
  const [open, setOpen] = useState(false)

  const handleClick = (imageSrc: string) => {
    setImgSrc(imageSrc)
    setOpen(true)
  }

  return (
    <div className="mt-2">
      {milestone.images.length >= 1 ? (
        <ul role="list" className="grid grid-cols-5 gap-x-4 gap-y-8">
          {milestone.images.map((imageSrc: string) => (
            <li key={imageSrc}>
              <Image
                src={imageSrc}
                alt={imageSrc}
                width={500}
                height={500}
                onClick={() => handleClick(imageSrc)}
                className="w-full flex-1 cursor-pointer rounded object-cover hover:opacity-75"
              />
            </li>
          ))}
          <ImageEnlarge imgSrc={imgSrc} open={open} setOpen={setOpen} />
        </ul>
      ) : (
        <p>
          <span>N/A</span>
        </p>
      )}
    </div>
  )
}

export const MilestoneDetails = ({
  milestone,
  contractor,
  paymentMethod,
  homeowner,
}) => {
  const { name, description, price, _project, notes, receipt } = milestone

  const { link: receiptLink } = receipt || {}

  const text = getText[milestone.status as MilestoneStatus]
  const color = getColor[milestone.status as MilestoneStatus]
  const action = getAction[milestone.status as MilestoneStatus]
  const styles = 'badge badge-lg p-3 whitespace-nowrap'

  return (
    <div className="mt-8 sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="pb-10 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          {name}
          <div>
            <div className={clsx(color, styles)}>{text}</div>
          </div>
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="milestone-details"
            className="lg:col-span-7"
          >
            <h2 id="milestone-details" className="sr-only">
              Milestone Details
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              <li className="flex py-6">
                <div className="flex flex-1 flex-col justify-between">
                  <div className="sm:flex lg:col-span-4">
                    <div>
                      <h3 className="text-base font-medium text-gray-500">
                        <span>Description</span>
                      </h3>
                      <p className="mt-2 text-gray-900">{description}</p>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex py-6">
                <div className="flex flex-1 flex-col justify-between">
                  <div className="sm:flex lg:col-span-4">
                    <div>
                      <h3 className="text-base font-medium text-gray-500">
                        <span>Contractor</span>
                      </h3>
                      <div className="mt-2  text-gray-900">
                        {contractor ? (
                          <ContractorModal contractor={contractor} />
                        ) : (
                          'No Contractor'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex py-6">
                <div className="flex flex-1 flex-col justify-between">
                  <div className="sm:flex lg:col-span-4">
                    <div>
                      <h3 className="text-base font-medium text-gray-500">
                        <span>Images</span>
                      </h3>
                      <div className="mt-2  text-gray-900">
                        <Images milestone={milestone} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex py-6">
                <div className="flex flex-1 flex-col justify-between">
                  <div className="sm:flex lg:col-span-4">
                    <div>
                      <h3 className="text-base font-medium text-gray-500">
                        <span>Notes</span>
                      </h3>
                      <p className="mt-2  text-gray-900">
                        {notes ? <span>{notes}</span> : <span>N/A</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-10 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-semibold text-gray-900"
            >
              Milestone Summary
            </h2>

            <dl className="mt-6 space-y-4">
              {paymentMethod && (
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
              )}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${price.toLocaleString('en')}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              {milestone.status === 'pendingReview' && (
                <Elements stripe={getStripe()}>
                  <MilestonePaymentForm
                    milestone={milestone}
                    homeowner={homeowner}
                  />
                </Elements>
              )}

              {milestone.status === 'approved' && receiptLink && (
                <a
                  href={receiptLink.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="button"
                    className="btn-outline btn w-full py-3 px-4"
                  >
                    View Receipt
                  </button>
                </a>
              )}

              {milestone.status === 'rejected' && (
                <button
                  type="button"
                  disabled
                  className="btn-outline btn w-full py-3 px-4"
                >
                  Under Review
                </button>
              )}

              {milestone.status === 'inProgress' && (
                <button
                  type="button"
                  disabled
                  className="btn-outline btn w-full py-3 px-4"
                >
                  In Progress
                </button>
              )}

              {milestone.status === 'notStarted' && (
                <button
                  type="button"
                  disabled
                  className="btn-outline btn w-full py-3 px-4"
                >
                  Not Started
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

interface ImagesProps {
  milestone: Milestone
}
