import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Card, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { fetchPostJSON } from 'hooks/stripe'
import { useRouter } from 'next/router'
import { FormEvent, FunctionComponent, useState } from 'react'

export const UpdatePaymentForm: FunctionComponent<UpdatePaymentFormProps> = ({
  firstName,
  lastName,
  email,
  paymentMethod,
}) => {
  const [updateStatus, setUpdateStatus] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const handleOnChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setUpdateStatus({ status: 'error' })
      setErrorMessage(event.error.message ?? 'An unknown error occured')
      return
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!event.currentTarget.reportValidity()) return
    if (!stripe || !elements) return

    setUpdateStatus({ status: 'processing' })

    const response = await fetchPostJSON('/api/stripe/paymentMethodSetup', {
      customerName: `${firstName} ${lastName}`,
      homeownerEmail: email,
    })

    setUpdateStatus(response)

    if (response.statusCode === 500) {
      setUpdateStatus({ status: 'error' })
      setErrorMessage(response.message)
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
      return
    } else if (response && result) {
      setUpdateStatus(response)

      // trackEvent({
      //   name: PROFILE_EVENTS.PAYMENT_METHOD_UPDATE,
      // })

      setTimeout(() => {
        router.reload()
      }, 1500)
    }
  }

  return (
    <div className="mt-10">
      <div className="md:grid-cols-3">
        <div className="md:col-span- mt-5 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="space-y-6 sm:space-y-5">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Payment Method
                    </h3>
                  </div>

                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="saved"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Saved Payment Method
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <input
                          id="saved"
                          name="saved"
                          type="text"
                          placeholder={`${paymentMethod?.brand?.toUpperCase()} ending in ${
                            paymentMethod.last4
                          }`}
                          disabled
                          className="block w-full max-w-lg rounded-md border border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
                        />
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="newPaymentMethod"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        New Payment Method
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <div className="block w-full max-w-lg rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                          <CardElement onChange={handleOnChange} />
                        </div>
                        {['error'].includes(updateStatus?.status) && (
                          <div className="mt-2 block">
                            <p className="text-sm text-red-600">
                              {errorMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={
                    !['initial', 'succeeded', 'error'].includes(
                      updateStatus?.status
                    ) || !stripe
                  }
                  className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-52"
                >
                  {!['initial', 'error'].includes(updateStatus?.status) ? (
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

interface UpdatePaymentFormProps {
  paymentMethod: Card
  firstName: Homeowner['firstName']
  lastName: Homeowner['lastName']
  email: Homeowner['email']
}

export default UpdatePaymentForm
