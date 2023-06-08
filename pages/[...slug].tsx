import { Layout } from '@components/layout'
import { getStoryblokApi, StoryblokComponent, useStoryblokState } from '@storyblok/react'

const Page = ({ story }: any) => {
  story = useStoryblokState(story)
  
  return <StoryblokComponent blok={story.content} />
}

export async function getStaticProps({ params }: any) {
  let slug = params.slug ? params.slug.join('/') : 'home'

  let sbParams: any = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
    resolve_relations: ['collection-recommendations.collections', 'collection-benefits.benefits', 'about-us-team.team_members'],
  }

  const storyblokApi = getStoryblokApi()

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },

    // revalidate: 10,
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi()

  let sbParams: any = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
  }

  let { data } = await storyblokApi.get('cdn/links/', sbParams)

  let paths: any[] = []

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return
    }

    const slug = data.links[linkKey].slug

    let splittedSlug = slug.split('/')

    paths.push({ params: { slug: splittedSlug } })
  })

  return {
    paths: paths,
    fallback: false,
  }
}

Page.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default Page
