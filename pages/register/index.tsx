import { SignInNav } from '@components/navigation'
import { GenericFormField, Tooltip } from '@components/shared'
import { createMagicUser } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { Form, Formik } from 'formik'
import { checkUserExists } from 'hooks/auth'
import { useAddHomeowner } from 'hooks/homeowner'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as yup from 'yup'
import 'yup-phone-lite'

const signupValidationSchema = () => {
  return yup.object().shape({
    // TODO: maybe add better phone parsing
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .phone('US', 'Please enter a valid phone number')
      .length(10)
      .required('Phone number is required')
      .max(10),
  })
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

const Register = () => {
  const [field, setField] = useState<string>('')
  const [contractorErrorMsg, setContractorErrorMsg] = useState<string>('')

  const router = useRouter()

  const addHomeownerMutation = useAddHomeowner({
    onSuccess: async (_data: any, variables: any) => {
      const userExists = await checkUserExists({ phone: variables.phone })

      if (userExists) {
        await createMagicUser(`+1${variables.phone}`)

        router.push(ROUTE_MAP.dashboard.entry)
      } else {
        router.push(ROUTE_MAP.auth.register)
      }
    },
    onError: (error: any) => {
      console.error('***ERROR***', error)

      if (error.keyValue.email) {
        setField('email')
        setContractorErrorMsg(`${error.keyValue.email} already exists`)
      }

      if (error.keyValue.phone) {
        setField('phone')
        setContractorErrorMsg(
          `${error.keyValue.phone} already exists, please sign-in`
        )
      }
    },
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupValidationSchema()}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        setContractorErrorMsg('')

        await addHomeownerMutation.mutateAsync(values)
      }}
    >
      {({ isSubmitting }) => (
        <SignInNav>
          <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create your account
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10 sm:shadow">
                <Form className="space-y-6">
                  <div>
                    <div className="flex">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                    </div>
                    <div className="mt-2">
                      <GenericFormField
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                    </div>
                    <div className="mt-2">
                      <GenericFormField
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                    </div>
                    <div className="mt-2">
                      <GenericFormField
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {field === 'email' ? (
                        <p className="mt-1 block text-sm text-red-600">
                          {contractorErrorMsg}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <div className="flex">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Mobile Phone
                      </label>
                      <Tooltip message="Your mobile phone will be used to login to your account" />
                    </div>
                    <div className="mt-2">
                      <GenericFormField
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {field === 'phone' ? (
                        <p className="mt-1 block text-sm text-red-600">
                          {contractorErrorMsg}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 focus-visible:outline"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Account'}
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
                        href={ROUTE_MAP.auth.signIn}
                        className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="text-sm font-semibold">Sign In</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SignInNav>
      )}
    </Formik>
  )
}

export default Register
