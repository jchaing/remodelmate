import { Layout } from '@components/layout'

const Transformations = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        Transformations Placeholder
      </h1>
    </div>
  )
}

Transformations.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Transformations
