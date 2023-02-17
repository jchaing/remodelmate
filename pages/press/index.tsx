import { Layout } from '@components/layout'

const Press = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        Press Placeholder
      </h1>
    </div>
  )
}

Press.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Press
