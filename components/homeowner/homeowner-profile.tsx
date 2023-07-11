import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import 'yup-phone-lite'
import { useRouter } from 'next/router'
import { ROUTE_MAP } from '@utils/routes'
import { createMagicUser, magic } from '@utils/magic'
import { GenericFormField, Tooltip } from '@components/shared'
import { useUpdateHomeownerProfile } from 'hooks/homeowner'
import { shallowEqualObjects } from '@utils/compare'

const profileValidationSchema = () => {
  return yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .phone('US', 'Please enter a valid mobile number')
      .length(10)
      .required('Mobile number is required'),
  })
}

export const HomeownerProfile = ({
  homeowner: { firstName, lastName, email, phone },
}) => {
  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  }

  const [field, setField] = useState<string>('')
  const [homeownerErrorMsg, setHomeownerErrorMsg] = useState<string>('')

  const router = useRouter()

  const { mutateAsync, isLoading } = useUpdateHomeownerProfile({
    onSuccess: async (_data: any, variables: any) => {
      if (initialValues.phone !== variables.phone) {
        await magic.user.logout()
        await createMagicUser(`+1${variables.phone}`)
        await router.push(ROUTE_MAP.dashboard.profile)
        router.reload()
      }

      // TODO: When changing phone number, log user out and sign back into profile page
    },
    onError: (error: any) => {
      console.error('error on mutateAsync', error)

      if (error.keyValue.email) {
        setField('email')
        setHomeownerErrorMsg(`${error.keyValue.email} already exists`)
      }

      if (error.keyValue.phone) {
        setField('phone')
        setHomeownerErrorMsg(`${error.keyValue.phone} already exists`)
      }
    },
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema()}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)

          const profileValues = {
            ...values,
          }

          // Checks for changes before submitting to API
          if (!shallowEqualObjects(initialValues, values)) {
            await mutateAsync(profileValues)
          }
        }}
      >
        {({ isSubmitting }) => (
          <div className="mt-10">
            <div className="md:grid-cols-3">
              <div className="md:col-span- mt-5 md:mt-0">
                <Form className="mt-8 space-y-4">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="space-y-6 sm:space-y-5">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Personal Information
                          </h3>
                        </div>

                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              First Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <GenericFormField
                                name="firstName"
                                placeholder="Enter your first name"
                                type="text"
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Last Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <GenericFormField
                                name="lastName"
                                placeholder="Enter your last name"
                                type="text"
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <div className="flex">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Mobile Number
                              </label>
                              <div className="sm:pt-2">
                                <Tooltip message="Be cautious when updating your mobile number. We will send an SMS code to the new number." />
                              </div>
                            </div>
                            <div>
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <GenericFormField
                                  name="phone"
                                  placeholder="Enter your mobile number"
                                  type="tel"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                              </div>
                              {field === 'phone' ? (
                                <p className="mt-1 block text-sm text-red-600">
                                  {homeownerErrorMsg}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Email
                            </label>
                            <div>
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <GenericFormField
                                  name="email"
                                  placeholder="Enter your email"
                                  type="email"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                              </div>
                              {field === 'email' ? (
                                <p className="mt-1 block text-sm text-red-600">
                                  {homeownerErrorMsg}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:text-right">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-52"
                      >
                        {isSubmitting || isLoading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}
