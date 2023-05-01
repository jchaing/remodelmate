import { Layout } from '@components/layout'
import { useClientIsLoggedIn } from '@utils/magic'
import { useRouter } from 'next/router'
import { Loader } from '@components/shared'
import { ROUTE_MAP } from '@utils/routes'
import { DashboardNav } from '@components/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { UpdatePaymentForm } from '@components/stripe'
import { getStripe } from '@utils/stripe'
import { Card } from '@stripe/stripe-js'
import { usePaymentMethod } from 'hooks/stripe'
import { useGetHomeowner } from 'hooks/homeowner'
// import { PROJECT_DETAILS_EVENTS_ENUM, trackEvent } from '@utils/mixpanel'

const PaymentPage = () => {
  const router = useRouter()

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: homeowner,
    error: isHomeownerError,
    isLoading: isHomeownerLoading,
  }: { data: Homeowner; error: any; isLoading: boolean } = useGetHomeowner()

  const {
    data: paymentMethod,
    error: paymentMethodError,
    isLoading: paymentMethodIsLoading,
  }: { data: Card; error: any; isLoading: boolean } = usePaymentMethod()

  if (isLoggedInLoading || isHomeownerLoading || paymentMethodIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || isHomeownerError|| paymentMethodError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  const { firstName, lastName, email } = homeowner

  return (
    <DashboardNav>
      <Elements stripe={getStripe()}>
        <UpdatePaymentForm
          paymentMethod={paymentMethod}
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      </Elements>
    </DashboardNav>
  )
}

PaymentPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default PaymentPage
