import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import {
  HomeBlog,
  HomeCollections,
  HomeCta,
  HomeFeature,
  HomeHero,
} from '@components/storyblok/home'
import { ComingSoon, Page } from '@components/storyblok'
import { BlogArticle, BlogPage } from '@components/storyblok/blog'
import {
  CollectionsGrid,
  CollectionsHeader,
} from '@components/storyblok/collections'
import {
  Collection,
  CollectionBenefits,
  CollectionMaterials,
  CollectionRecommendations,
} from '@components/storyblok/collections/collection-detail'
import {
  ContractorsBenefits,
  ContractorsCta,
  ContractorsFaq,
  ContractorsFeatures,
  ContractorsHero,
} from '@components/storyblok/contractors'

const components = {
  page: Page,
  'coming-soon': ComingSoon,
  'home-hero': HomeHero,
  'home-collections': HomeCollections,
  'home-feature': HomeFeature,
  'home-blog': HomeBlog,
  'home-cta': HomeCta,
  'collections-header': CollectionsHeader,
  'collections-grid': CollectionsGrid,
  collection: Collection,
  'collection-benefits': CollectionBenefits,
  'collection-materials': CollectionMaterials,
  'collection-recommendations': CollectionRecommendations,
  'blog-page': BlogPage,
  'blog-article': BlogArticle,
  'contractors-hero': ContractorsHero,
  'contractors-benefits': ContractorsBenefits,
  'contractors-features': ContractorsFeatures,
  'contractors-faq': ContractorsFaq,
  'contractors-cta': ContractorsCta,
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'us' },
  components,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />

        <title>{`remodelmate | Effortless Bathroom Renovations`}</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
