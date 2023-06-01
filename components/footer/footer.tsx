/* eslint-disable @next/next/no-img-element */
import { ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'

export const Footer = () => {
  return (
    <>
      <footer className="sticky top-[100vh] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="md:order-1 ">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2020 remodelmate, Inc. All rights reserved.
            </p>
          </div>
          <div className="mt-8 flex justify-center space-x-6 md:order-2 md:mt-0">
            <Link href={ROUTE_MAP.app.privacy}>
              <p className="text-center text-xs leading-5 text-gray-500">
                Privacy Policy
              </p>
            </Link>
            <Link href={ROUTE_MAP.app.tos}>
              <p className="text-center text-xs leading-5 text-gray-500">
                Terms of Service
              </p>
            </Link>
            <Link href={ROUTE_MAP.app.contactUs}>
              <p className="text-center text-xs leading-5 text-gray-500">
                Contact Us
              </p>
            </Link>
            <Link href={ROUTE_MAP.app.blog}>
              <p className="text-center text-xs leading-5 text-gray-500">
                Blog
              </p>
            </Link>
            <Link href={ROUTE_MAP.app.faq}>
              <p className="text-center text-xs leading-5 text-gray-500">
                FAQ
              </p>
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
