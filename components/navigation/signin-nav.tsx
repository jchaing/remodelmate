import { FunctionComponent, ReactNode } from 'react'
import Link from 'next/link'
import { ROUTE_MAP } from '@utils/routes'
import { SignInFooter } from '@components/footer'

export const SignInNav: FunctionComponent<AccountNavProps> = ({
  children,
}) => {
  return (
    <div className='min-h-screen'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link href={ROUTE_MAP.app.entry}>
            <img
              className="block h-4 w-auto"
              src="https://remodelmate-v2-local.s3.us-east-2.amazonaws.com/branding/logos/wordmark/svg/remodelmate-black.svg"
              alt="Remodelmate"
            />
          </Link>
        </div>
      </div>

      {children}

     <SignInFooter /> 
    </div>
  )
}

interface AccountNavProps {
  children: ReactNode
}
