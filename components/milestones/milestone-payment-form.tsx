import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { useStripe } from '@stripe/react-stripe-js'
import { getUserToken } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { fetchPostJSON } from 'hooks/stripe'
import Link from 'next/link'
import { Fragment, FunctionComponent, useState } from 'react'

// import { PROJECT_DETAILS_EVENTS, trackEvent } from '../lib/mixpanel'

interface PaymentSuccessModalProps {
  projectId: string
  modalIsOpen: boolean
  setModalIsOpen: (open: boolean) => void
}

const PaymentSuccessModal: FunctionComponent<PaymentSuccessModalProps> = ({
  projectId,
  modalIsOpen,
  setModalIsOpen,
}) => {
  const closeModal = () => setModalIsOpen(false)

  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"></p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Link
                    href={`${ROUTE_MAP.dashboard.projectDetails}/${projectId}`}
                    className="btn w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={closeModal}
                  >
                    Go back to dashboard
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export const MilestonePaymentForm = ({ milestone, homeowner }) => {
  const {
    _project: { _id: projectId },
    _id: milestoneId,
    _contractor: { _id: contractorId } = {
      _id: null,
    },
  } = milestone || {}

  const { email, stripeCustomerId: customerId } = homeowner || {}
  const API_URL = `/api/milestones/payMilestone`

  const [payment, setPayment] = useState({ status: 'initial' })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!e.currentTarget.reportValidity()) return // abort if form isn't valid

    setPayment({ status: 'processing' })

    const response = await fetchPostJSON('/api/stripe/paymentIntent', {
      milestoneId: milestoneId,
      projectId: projectId,
      homeownerEmail: email,
      customerId: customerId,
    })

    if (response.statusCode === 500) {
      setPayment({ status: 'error' })

      setErrorMessage(response.message)
      return
    } else if (response) {
      setPayment(response)

      const receipt = response?.charges?.data[0]?.receipt_url

      const reqBody = {
        id: milestoneId,
        milestoneStatus: 'approved',
        projectId: projectId,
        stripeReceipt: receipt,
      }

      const token = await getUserToken()

      try {
        const res = await fetch(API_URL, {
          method: 'PATCH',
          body: JSON.stringify(reqBody),
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        if (data) {
          // trackEvent({
          //   name: PROJECT_DETAILS_EVENTS.MILESTONE_PAY,
          //   props: {
          //     projectId: projectId,
          //     milestoneId: milestoneId,
          //     contractorId: contractorId,
          //   },
          // })

          setModalIsOpen(true)
        }
      } catch (error) {
        setPayment({ status: 'error' })

        setErrorMessage(error.message)
      }
    }
  }

  return (
    <>
      <form onClick={handleSubmit}>
        <button
          className="btn w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50"
          disabled={!['initial', 'error'].includes(payment.status) || !stripe}
        >
          {!['initial', 'error'].includes(payment.status) ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{' '}
              {payment.status.toUpperCase()}...
            </>
          ) : (
            'Approve & Pay'
          )}
        </button>
      </form>
      <PaymentSuccessModal
        projectId={projectId}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  )
}

export default MilestonePaymentForm
