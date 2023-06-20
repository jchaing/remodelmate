import { Layout } from '@components/layout'
import { DashboardNav } from '@components/navigation'
import { BookProject } from '@components/projects'
import { BackButton, Loader } from '@components/shared'
import { Card } from '@stripe/stripe-js'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useProject } from 'hooks/projects'
import { usePaymentMethod } from 'hooks/stripe'
import Head from 'next/head'
import { useRouter } from 'next/router'

const BookProjectPage = () => {
  const router = useRouter()
  const { projectId } = router.query

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: projectData,
    error: projectError,
    isLoading: projectIsLoading,
  } = useProject(projectId as string, {
    enabled: !!projectId,
  })

  const {
    data: paymentMethod,
    error: paymentMethodError,
    isLoading: paymentMethodIsLoading,
  }: { data: Card; error: any; isLoading: boolean } = usePaymentMethod()

  if (isLoggedInLoading || projectIsLoading || paymentMethodIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || projectError || paymentMethodError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  const {
    homeowner,
    project,
    project: { milestones },
  } = projectData

  if (project.activated) {
    router.push(`${ROUTE_MAP.dashboard.projectDetails}/${project._id}`)
    return <></>
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        {/* <meta property="og:title" content={pageTitle} key="ogtitle" />
        <title>{pageTitle}</title> */}
      </Head>
      <DashboardNav>
        <BackButton />
        <BookProject
          homeowner={homeowner}
          project={project}
          milestones={milestones}
          paymentMethod={paymentMethod}
        />
      </DashboardNav>
    </>
  )
}

BookProjectPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default BookProjectPage
