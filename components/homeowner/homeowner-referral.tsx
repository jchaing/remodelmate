import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useGenerateCode } from 'hooks/referral'
import { useQueryClient } from 'react-query'

export const HomeownerReferral = ({ homeowner }) => {
  const initialValues = {
    referralCode: 'REMODELMATE-XXXXXXXX',
  }

  const { referralCode } = homeowner

  const cache = useQueryClient()

  const { mutateAsync, isLoading } = useGenerateCode({
    onSuccess: async (_data: any) => {
      await cache.invalidateQueries('homeowner')
    },
    onError: (error: any) => {
      console.error('error on mutateAsync', error)
    },
  })

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)

          await mutateAsync()
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
                            Referral
                          </h3>
                        </div>

                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="referralCode"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Invite Code
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <div
                                id="referralCode"
                                className={clsx(referralCode ? null : "text-gray-300", "block w-full max-w-lg rounded-md border border-gray-200 text-center sm:mt-px sm:max-w-xs sm:py-2 sm:text-sm")}
                              >
                                {referralCode
                                  ? referralCode
                                  : 'REMODELMATE-XXXXXXXX'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:text-right">
                      {!referralCode ? (
                        <button
                          disabled={isSubmitting || referralCode}
                          type="submit"
                          className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-52"
                        >
                          {isSubmitting || isLoading
                            ? 'Generating...'
                            : 'Generate'}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-52"
                        >
                          Generate
                        </button>
                      )}
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
