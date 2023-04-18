import { Layout } from '@components/layout'
import { useClientIsLoggedIn } from '@utils/magic'
import { useRouter } from 'next/router'
import { Loader } from '@components/shared'
import { ROUTE_MAP } from '@utils/routes'
import { DashboardNav } from '@components/navigation'
import { ProjectDetails } from '@components/projects'
import { MilestonesTable } from '@components/milestones'
import { useProject } from 'hooks/projects'
// import { PROJECT_DETAILS_EVENTS_ENUM, trackEvent } from '@utils/mixpanel'

const ProjectPage = () => {
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

  if (isLoggedInLoading || projectIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || projectError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  const { milestones } = projectData.project

  return (
    <DashboardNav>
      <div className="max-w-7xl">
        <ProjectDetails project={projectData.project} />
        <MilestonesTable milestones={milestones} />
      </div>
    </DashboardNav>
  )
}

ProjectPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ProjectPage
