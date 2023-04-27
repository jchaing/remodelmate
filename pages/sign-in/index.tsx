import { SignInNav } from '@components/navigation'
import { GenericFormField, Tooltip } from '@components/shared'
import { createMagicUser } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { Form, Formik } from 'formik'
import { checkUserExists } from 'hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { FunctionComponent } from 'react'
import * as yup from 'yup'
import 'yup-phone-lite'

const signinValidationSchema = () => {
  return yup.object().shape({
    // TODO: maybe add better phone parsing
    phone: yup
      .string()
      .phone('US', 'Please enter a valid phone number')
      .length(10)
      .required('Phone number is required'),
  })
}

const signinInitialValues = {
  // phone: '9563079250',
  phone: '',
}

const SignIn = () => {
  const router = useRouter()
  return (
    <Formik
      initialValues={signinInitialValues}
      validationSchema={signinValidationSchema()}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        // validate phone exists, we only do this because
        // as of now user should already exists
        const userExists = await checkUserExists({ phone: values.phone })

        if (userExists) {
          // naive way way of adding country code to phone num
          await createMagicUser(`+1${values.phone}`)

          setSubmitting(false)

          router.push(ROUTE_MAP.dashboard.entry)
        } else {
          router.push(ROUTE_MAP.auth.register)
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <SignInNav>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10 sm:shadow">
                  <Form className="space-y-6">
                    <div>
                      <div className="flex">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Mobile Phone
                        </label>
                        <Tooltip message="We'll send you an SMS code to your mobile phone to complete your sign-in, which will then log you directly into your account dashboard." />
                      </div>
                      <div className="mt-2">
                        <GenericFormField
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 focus-visible:outline"
                      >
                        {isSubmitting ? 'Loading...' : 'Sign in'}
                      </button>
                    </div>
                  </Form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div>
                        <Link
                          href={ROUTE_MAP.auth.register}
                          className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                        >
                          <span className="text-sm font-semibold">
                            Create Account
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SignInNav>
        )
      }}
    </Formik>
  )
}

// interface SignInProps {
//   createMagicUser: (phone: string) => Promise<boolean>
// }

export default SignIn
