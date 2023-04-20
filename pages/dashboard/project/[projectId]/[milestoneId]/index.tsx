import { Layout } from '@components/layout'
import { useClientIsLoggedIn } from '@utils/magic'
import { useRouter } from 'next/router'
import { Loader } from '@components/shared'
import { ROUTE_MAP } from '@utils/routes'
import { DashboardNav } from '@components/navigation'
import { MilestoneDetails } from '@components/milestones'
import { useMilestone } from 'hooks/milestones'
import { usePaymentMethod } from 'hooks/stripe'
import { Card } from '@stripe/stripe-js'

const MilestoneDetailsPage = () => {
  const router = useRouter()
  const { milestoneId } = router.query

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: milestoneData,
    error: milestoneError,
    isLoading: milestoneIsLoading,
  } = useMilestone(milestoneId as string, {
    enabled: !!milestoneId,
  })

  const {
    data: paymentMethod,
    error: paymentMethodError,
    isLoading: paymentMethodIsLoading,
  }: { data: Card; error: any; isLoading: boolean } = usePaymentMethod()

  if (isLoggedInLoading || milestoneIsLoading || paymentMethodIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || milestoneError || paymentMethodError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  const {
    milestone,
    milestone: {
      _project: { _homeowner: homeowner },
    },
  } = milestoneData

  const contractor = milestone._contractor || null

  return (
    <DashboardNav>
      <MilestoneDetails
        milestone={milestone}
        contractor={contractor}
        paymentMethod={paymentMethod}
        homeowner={homeowner}
      />
    </DashboardNav>
  )
}

MilestoneDetailsPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default MilestoneDetailsPage
