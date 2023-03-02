import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { HomeHero } from '@components/storyblok/home/home-hero'
import { Page } from '@components/storyblok/page'

const components = {
  page: Page,
  'home-hero': HomeHero
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'us' },
  components
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
