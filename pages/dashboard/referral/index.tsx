import { HomeownerReferral } from '@components/homeowner'
import { Layout } from '@components/layout'
import { DashboardNav } from '@components/navigation'
import { Loader } from '@components/shared'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useGetHomeowner } from 'hooks/homeowner'
import { useRouter } from 'next/router'

const ReferralPage = () => {
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

  if (isLoggedInLoading || isHomeownerLoading) {
    return <Loader />
  }

  if (isLoggedInError || isHomeownerError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return (
    <DashboardNav>
      <HomeownerReferral homeowner={homeowner} />
    </DashboardNav>
  )
}

ReferralPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ReferralPage
