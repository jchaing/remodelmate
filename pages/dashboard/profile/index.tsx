import { Layout } from '@components/layout'
import { useClientIsLoggedIn } from '@utils/magic'
import { useRouter } from 'next/router'
import { Loader } from '@components/shared'
import { ROUTE_MAP } from '@utils/routes'
import { DashboardNav } from '@components/navigation'
import { useGetHomeowner } from 'hooks/homeowner'
import { HomeownerProfile } from '@components/homeowner'
// import { PROJECT_DETAILS_EVENTS_ENUM, trackEvent } from '@utils/mixpanel'

const ProfilePage = () => {
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
      <HomeownerProfile homeowner={homeowner} />
    </DashboardNav>
  )
}

ProfilePage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ProfilePage
