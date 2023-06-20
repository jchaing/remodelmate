import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { fetchPostJSON } from 'hooks/stripe'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

// import { ESTIMATE_BUILDER_EVENTS, trackEvent } from '../lib/mixpanel'

export function SignUpForm({ firstName, lastName, email, projectId }) {
  const [input, setInput] = useState({ firstName, lastName })
  const [updateStatus, setUpdateStatus] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)

  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const homeowner = { firstName, lastName, email }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleOnChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)

    if (event.error || !event.complete) {
      setDisabled(true)

      setUpdateStatus({ status: 'error' })

      if (event.error) {
        setErrorMessage(event.error.message ?? 'An unknown error occured')
        return
      } else {
        setErrorMessage('')
      }

      return
    }

    if (!event.error && !event.complete) {
      setUpdateStatus({ status: 'error' })
      setErrorMessage('')
    }

    if (event.complete && !event.error) {
      setUpdateStatus({ status: 'initial' })
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setProcessing(true)

    if (!event.currentTarget.reportValidity()) return
    if (!stripe || !elements) return

    setUpdateStatus({ status: 'processing' })

    const response = await fetchPostJSON('/api/stripe/signUp', {
      customerName: `${input.firstName} ${input.lastName}`,
      homeownerEmail: homeowner.email,
    })

    setUpdateStatus({ status: 'authenticating' })

    if (response.statusCode === 500) {
      setUpdateStatus({ status: 'error' })
      setErrorMessage(response.message)
      setProcessing(false)
      return
    }

    const result = await stripe.confirmCardSetup(response.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${firstName} ${lastName}`,
          email: email,
        },
      },
    })

    if (result.error) {
      setUpdateStatus({ status: 'error' })
      setErrorMessage(
        result.error.message ? result.error.message : 'An unknown error occured'
      )
      setProcessing(false)
      return
    } else if (response && result) {
      setErrorMessage('')
      setUpdateStatus({ status: 'success' })
      setSucceeded(true)
      setProcessing(false)

      // trackEvent({
      //   name: ESTIMATE_BUILDER_EVENTS.ESTIMATE_EVENT_ACTION,
      //   props: {
      //     type: ESTIMATE_BUILDER_EVENTS.STEP_ADD_PAYMENT_METHOD,
      //     projectId: projectId,
      //   },
      // })

      setTimeout(() => {
        router.reload()
      }, 500)
    }
  }

  const creditCardLogoIcons =
    'https://remodelmate-v2-local.s3.us-east-2.amazonaws.com/website/icons/credit-card-logo-icons.svg'

  return (
    <>
      <h2 id="summary-heading" className="text-xl font-semibold text-gray-900">
        Enter Payment Details
      </h2>

      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5 lg:flex lg:flex-col lg:gap-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                First name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0 lg:min-w-full">
                <input
                  id="firstName"
                  name="firstName"
                  required
                  type="text"
                  placeholder={firstName}
                  onChange={(e) => handleInputChange(e)}
                  value={input.firstName}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 lg:flex lg:flex-col lg:gap-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Last name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0 lg:min-w-full">
                <input
                  id="lastName"
                  name="lastName"
                  required
                  type="text"
                  placeholder={lastName}
                  value={input.lastName}
                  onChange={(e) => handleInputChange(e)}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 lg:flex lg:flex-col lg:gap-1">
              <label
                htmlFor="cardDetails"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Card Details
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0 lg:min-w-full">
                <div className="block w-full max-w-lg rounded-md border border-gray-300 bg-white p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                  <CardElement onChange={handleOnChange} />
                </div>
                {['error'].includes(updateStatus.status) && (
                  <div className="mt-2 block">
                    <p className="text-sm text-indigo-600">{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="py-8">
            <button
              type="submit"
              disabled={
                processing ||
                disabled ||
                succeeded ||
                errorMessage.length > 0 ||
                !stripe
              }
              className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {processing || succeeded ? (
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
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>{' '}
                  {updateStatus?.status?.toUpperCase()}...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>

          <div>
            <img src={creditCardLogoIcons} className="mx-auto w-1/2" />
          </div>
        </form>
      </div>
    </>
  )
}
