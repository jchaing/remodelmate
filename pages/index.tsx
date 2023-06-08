import { Layout } from '@components/layout'
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react'

// https://tailwindui.com/components/ecommerce/page-examples/storefront-pages#component-738c2f255a1993e2224c28c461972844

const Home = ({ story }: any) => {
  story = useStoryblokState(story)

  return <StoryblokComponent blok={story.content} />
}

export async function getStaticProps() {
  const slug = 'home'

  const sbParams: any = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
    resolve_relations: ['home-collections.collections', 'home-blog.articles'],
  }

  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
    },
    revalidate: 10,
  }
}

Home.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Home
