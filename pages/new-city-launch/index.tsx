import { Layout } from '@components/layout'

const NewCityLaunch = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        NewCityLaunch Placeholder
      </h1>
    </div>
  )
}

NewCityLaunch.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default NewCityLaunch
