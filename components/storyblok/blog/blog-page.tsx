/* eslint-disable @next/next/no-img-element */
import { getStoryblokApi, storyblokEditable } from '@storyblok/react'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const BlogPage = ({ blok }: any) => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const storyblokApi = getStoryblokApi()

    const getArticles = async () => {
      const sbParams: any = {
        version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
        starts_with: 'blog/',
        is_startpage: false,
      }

      const { data } = await storyblokApi.get('cdn/stories', sbParams)

      setArticles((prev) =>
        data.stories.map((article: any) => {
          article.content.slug = article.slug
          return article
        })
      )
    }

    getArticles()
  }, [])

  return (
    <>
      <Head>
        <title>Blog | Remodelmate</title>
      </Head>
      <section
        aria-labelledby="from-the-blog-heading"
        {...storyblokEditable(blok)}
      >
        <div className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0">
            <div className="h-1/3 bg-white sm:h-2/3" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {blok.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                {blok.sub_heading}
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {articles.map((article: any) => (
                <div
                  key={article.uuid}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="flex-shrink-0 hover:opacity-75"
                  >
                    <img
                      className="h-48 w-full object-cover"
                      src={article.content?.image.filename}
                      alt={article.content?.image.alt}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="mt-2 block"
                      >
                        <p className="text-xl font-semibold text-gray-900">
                          {article.content?.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {article.content?.teaser}
                        </p>
                      </Link>
                    </div>
                    {/* <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <a href="#">
                      <span className="sr-only">Michael Smith</span>
                        <img
                        className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#" className="hover:underline">
                          Michael Smith
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2020-03-16">Mar 16, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>6 min read</span>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
