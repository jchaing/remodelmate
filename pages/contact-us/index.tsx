import { Layout } from '@components/layout'
import { GenericFormField } from '@components/shared'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { Form, Formik } from 'formik'
import { useContactUsMessage } from 'hooks/contact-us'
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
    message: yup.string().required('Please provide a detailed message inquiry'),
  })
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

const ContactUs = () => {
  const [success, setSuccess] = useState<boolean>(false)

  const sendEmail = useContactUsMessage({
    onSuccess: async (_data: any) => {
      setSuccess(true)
    },
    onError: (error: any) => {
      console.error('***ERROR***', error)
    },
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupValidationSchema()}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        await sendEmail.mutateAsync(values)

        resetForm({
          values: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          },
        })
      }}
    >
      {({ isSubmitting }) => (
        <section className="relative isolate bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                  <svg
                    className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        x="100%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                      fill="white"
                    />
                    <svg
                      x="100%"
                      y={-1}
                      className="overflow-visible fill-gray-50"
                    >
                      <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                    </svg>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                      fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Get in touch
                </h2>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  <p>Want to talk to a human about your bathroom renovation?</p>
                  <br />
                  <p>
                    Text or email us or fill out this form and give us as much
                    detail as possible.{' '}
                  </p>
                </div>
                <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon
                        className="h-7 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="tel:+1 (240) 301-3889"
                      >
                        (240) 301-3889
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <MailIcon
                        className="h-7 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <a
                        className="hover:text-gray-900"
                        href="mailto:support@remodelmate.com"
                      >
                        support@remodelmate.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <Form className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
              <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <GenericFormField
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <GenericFormField
                        type="text"
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <GenericFormField
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="mt-2.5">
                      <GenericFormField
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <GenericFormField
                        name="message"
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        // defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="rounded-md bg-sky-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 focus-visible:outline"
                  >
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
                {success ? (
                  <div className="mt-10 text-lg leading-8 text-sky-800">
                    <strong>
                      Your message has been sent. We will contact you shortly.
                    </strong>
                  </div>
                ) : null}
              </div>
            </Form>
          </div>
        </section>
      )}
    </Formik>
  )
}

ContactUs.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ContactUs
