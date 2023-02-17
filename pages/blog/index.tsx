import { Layout } from '@components/layout'

const Blog = () => {
  return (
    <div>
      <h1 className="mt-28 text-center text-2xl">
        Blog Placeholder
      </h1>
    </div>
  )
}

Blog.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Blog
