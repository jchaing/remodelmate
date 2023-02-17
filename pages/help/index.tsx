import { Layout } from '@components/layout'

const Help = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        Help Placeholder
      </h1>
    </div>
  )
}

Help.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Help
