import { useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { fetchPostJSON } from 'hooks/stripe'
import { formatAmountForDisplay } from '@utils/stripe'
import { ROUTE_MAP } from '@utils/routes'
import { getUserToken } from '@utils/magic'

// import { ESTIMATE_BUILDER_EVENTS, trackEvent } from '../lib/mixpanel'

export function StripeForm({
  firstName,
  lastName,
  email,
  customerId,
  projectId,
  milestoneId,
  milestonePrice,
  milestoneName,
}) {
  const router = useRouter()
  const API_URL = `/api/projects/book`
  const homeowner = { firstName, lastName, email, customerId }
  const [payment, setPayment] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')
  const stripe = useStripe()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!e.currentTarget.reportValidity()) return // abort if form isn't valid

    setPayment({ status: 'processing' })

    const response = await fetchPostJSON('/api/stripe/paymentIntent', {
      homeownerEmail: homeowner.email,
      customerId: homeowner.customerId,
      customerName: `${homeowner.firstName} ${homeowner.lastName}`,
      milestoneName: milestoneName,
      milestoneId: milestoneId,
    })

    if (response.statusCode === 500) {
      setPayment({ status: 'error' })
      setErrorMessage(response.message)
      return
    } else if (response) {
      const receipt = response.charges.data[0].receipt_url

      const token = await getUserToken()

      try {
        const res = await fetch(API_URL, {
          method: 'PATCH',
          body: JSON.stringify({
            milestoneId: milestoneId,
            milestoneStatus: 'approved',
            stripeReceipt: receipt,
            projectId: projectId,
          }),
          headers: {
            authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        if (data) setPayment({ status: 'succeeded' })
      } catch (error) {
        setPayment({ status: 'error' })
        setErrorMessage(error.message)
      }

      // if (milestoneName === 'Booking') {
      //   trackEvent({
      //     name: ESTIMATE_BUILDER_EVENTS.ESTIMATE_EVENT_ACTION,
      //     props: {
      //       type: ESTIMATE_BUILDER_EVENTS.STEP_BOOK_PROJECT,
      //       projectId: projectId,
      //     },
      //   })
      // }
      router.push(`${ROUTE_MAP.dashboard.projectDetails}/${projectId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={
          !['initial', 'succeeded', 'error'].includes(payment.status) || !stripe
        }
        className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
          <>{`Book Project — ${formatAmountForDisplay(milestonePrice)}`}</>
        )}
      </button>

      {['error'].includes(payment.status) && (
        <div className="mt-2 block">
          <p className="text-sm text-indigo-600">{errorMessage}</p>
        </div>
      )}
    </form>
  )
}
