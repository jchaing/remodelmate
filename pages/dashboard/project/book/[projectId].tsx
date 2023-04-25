import { Layout } from '@components/layout'
import { DashboardNav } from '@components/navigation'

const BookProjectPage = () => {
  return (
    <DashboardNav>
      <div>BOOK PROJECT</div>
    </DashboardNav>
  )
}

BookProjectPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default BookProjectPage
