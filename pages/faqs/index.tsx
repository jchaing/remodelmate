import { Layout } from '@components/layout'

const FAQs = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        FAQs Placeholder
      </h1>
    </div>
  )
}

FAQs.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default FAQs
