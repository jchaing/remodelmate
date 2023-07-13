import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useGenerateCode } from 'hooks/referral'
import { useQueryClient } from 'react-query'
import {
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share'

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
                              htmlFor="referralDescription"
                              className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2 sm:font-medium"
                            >
                              Refer a Friend
                            </label>
                            <div className="mt-4 sm:col-span-2 sm:mt-0">
                              <div
                                id="referralDescription"
                                className="w-full max-w-lg rounded-md sm:mt-px sm:max-w-xs sm:py-2 sm:text-sm"
                              >
                                <p>GIVE $750, GET $250</p>
                                <p className="mt-3">
                                  Give your friends up to $750 off their first
                                  project and get $250 (cash) for each
                                  successful referral
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="referralCode"
                              className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2 sm:font-medium"
                            >
                              Invite Code
                            </label>
                            <div className="mt-4 sm:col-span-2 sm:mt-0">
                              <div
                                id="referralCode"
                                className={clsx(
                                  referralCode ? null : 'text-gray-300',
                                  'block w-full max-w-lg rounded-md border border-gray-200 py-2 text-center sm:mt-px sm:max-w-xs sm:text-sm'
                                )}
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
                    {!referralCode ? (
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:text-right">
                        <button
                          disabled={isSubmitting || referralCode}
                          type="submit"
                          className="btn inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-52"
                        >
                          {isSubmitting || isLoading
                            ? 'Generating...'
                            : 'Generate'}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6 bg-gray-50 px-4 py-5 sm:space-y-5 sm:p-6">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200">
                          <label
                            htmlFor="socialMedia"
                            className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2 sm:font-medium"
                          >
                            Share via
                          </label>
                          <div
                            id="socialMedia"
                            className="mt-4 space-x-4 text-center sm:col-span-2 sm:mt-0 sm:text-left"
                          >
                            <TwitterShareButton
                              url={`https://remodelmate.com`}
                              title={`Remodelmate is the easiest way to get a bathroom renovation project done. Use my referral code ${referralCode} to get $750 off your first project. - `}
                              via="remodelmate"
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <EmailShareButton
                              url={`https://remodelmate.com`}
                              subject={`Remodelmate - $750 off your first project`}
                              body={`Remodelmate is the easiest way to get a bathroom renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                            >
                              <EmailIcon size={32} round />
                            </EmailShareButton>
                            {/* <FacebookShareButton
                              url={`https://remodelmate.com/?ref=${referralCode}`}
                              quote={`Remodelmate is the easiest way to get a home renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                              hashtag="#remodelmate"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <LinkedinShareButton
                              url={`https://remodelmate.com/`}
                              title={`Remodelmate is the easiest way to get a home renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                              summary={`Remodelmate is the easiest way to get a home renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                              source="remodelmate.com"
                            >
                              <LinkedinIcon size={32} round />
                            </LinkedinShareButton> */}
                          </div>
                        </div>
                      </div>
                    )}
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
