import { Layout } from '@components/layout'
import { DashboardNav } from '@components/navigation'

const ReferralPage = () => {
  return (
    <DashboardNav>
      <div>Referral Page</div>
    </DashboardNav>
  )
}

ReferralPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ReferralPage
