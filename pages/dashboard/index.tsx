import { Layout } from '@components/layout'
import { DashboardNav } from '@components/navigation'
import { Projects } from '@components/projects'
import { Loader } from '@components/shared'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useProjects } from 'hooks/projects'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter()

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: projectsData,
    error: projectsError,
    isLoading: projectsIsLoading,
  } = useProjects()

  if (isLoggedInLoading || projectsIsLoading) {
    return <Loader />
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.auth.signIn)
    return <></>
  }

  if (isLoggedInError || projectsError) {
    return <div>There was an error</div>
  }

  return (
    <DashboardNav>
      {projectsData.length > 0 ? (
        <Projects projectsData={projectsData} />
      ) : (
        <div className="mt-5 text-2xl sm:flex sm:items-center">
          No projects found
        </div>
      )}
    </DashboardNav>
  )
}

Dashboard.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Dashboard
