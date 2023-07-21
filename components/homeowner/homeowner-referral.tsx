import clsx from 'clsx'
import { Form, Formik } from 'formik'
import { useGenerateCode } from 'hooks/referral'
import { useQueryClient } from 'react-query'
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'

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

  const handleGmailComposeClick = () => {
    const preFilledSubject = encodeURIComponent(
      'Remodelmate - $750 off your first project'
    )
    const preFilledBody = encodeURIComponent(
      `Remodelmate is the easiest way to get a bathroom renovation project done. Use my referral code ${referralCode} to get $750 off your first project. - https://remodelmate.com`
    )
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&su=${preFilledSubject}&body=${preFilledBody}`

    const windowFeatures = 'width=500,height=400,resizable=yes,scrollbars=yes'
    window.open(gmailComposeUrl, '_blank', windowFeatures)
  }

  // TODO: Leaving this for now for future LinkedIn share post.
  // TODO: Doesn't work at the moment
  // const handleLinkedinShareClick = async (e: any) => {
  //   e.preventDefault()
  //   const linkedinBody = JSON.stringify({
  //     author: 'urn:li:person:cBdc5CljjR',
  //     commentary: 'Text of the post',
  //     visibility: 'PUBLIC',
  //     lifecycleState: 'PUBLISHED',
  //     distribution: {
  //       feedDistribution: 'MAIN_FEED',
  //       targetEntities: [],
  //       thirdPartyDistributionChannels: [],
  //     },
  //   })

  //   const res = await fetch('https://api.linkedin.com/rest/posts', {
  //     method: 'POST',
  //     body: linkedinBody,
  //     mode: 'no-cors',
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_LINKEDIN_ACCESS_TOKEN}`,
  //       'LinkedIn-Version': '202211',
  //       'Content-Type': 'application/json',
  //       'X-Restli-Protocol-Version': '2.0.0',
  //     },
  //   })

  //   if (res.ok) {
  //     const postId = res.headers.get('x-restli-id')
  //     console.log(postId)
  //   }
  // }

  return (
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
                                project and get $250 (cash) for each successful
                                referral
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

                          <button
                            onClick={handleGmailComposeClick}
                            className=""
                            type="button"
                          >
                            <svg
                              enableBackground="new 0 0 512 512"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                              height={32}
                              width={32}
                            >
                              <g>
                                <path
                                  d="M257.1,507.9C119.2,507.9,7.9,395.4,8.5,255.5C9.1,116.9,120.9,4.8,259.6,6.2   c136,1.3,247,112.8,245.9,253.1C504.4,397.1,393.9,507.5,257.1,507.9z M257,25.9C132.9,25.5,29.3,126.6,28.1,254.5   c-1.3,130.3,102.8,232.4,226.4,233.7c125.9,1.3,230.7-100.6,231.3-229.2C486.5,129.4,384.3,25.9,257,25.9z"
                                  fill="#E65C4F"
                                />
                                <path
                                  d="M388.1,143c13.4-1.4,26,9.3,26.9,22.9c0.2,3.6,0,7.3,0,11c-1.2,0-2.1,0.8-3.1,1.5   c-11,7.9-21.9,15.7-32.9,23.6c-36.7,25.2-73.4,50.3-110,75.6c-3.8,2.6-8.1,4.6-11.1,8.3c-1.7,0.3-2.8-0.8-4-1.7   c-29.6-20.6-59.3-41.3-88.9-61.9c-10.1-7-20.1-14-31-21.5c0,2.7,0,4.5,0,6.3c0,28.6,0,57.3,0,85.9c0,25.3,0.1,50.6,0.2,75.9   c0,0.7-0.1,1.4-0.1,2.1c-16.6,3.2-30.7-4.7-34.4-19.4c-0.5-2.1-0.7-4.3-0.7-6.4c0-58.7,0.1-117.5-0.1-176.2   c-0.1-14.9,13.2-28.1,27.1-26c0.5,0.5,0.9,1,1.4,1.4c42.1,31.2,84.2,62.4,126.2,93.6c2.5,1.9,4,1.6,6.3-0.1   c26.2-19.4,52.5-38.7,78.7-58C355.1,167.7,371.6,155.3,388.1,143z"
                                  fill="#E65A4D"
                                />
                                <path
                                  d="M134.1,369c-0.1-25.3-0.1-50.6-0.2-75.9c0-28.6,0-57.3,0-85.9c0-1.8,0-3.5,0-6.3   c10.8,7.5,20.9,14.5,31,21.5c29.6,20.6,59.3,41.3,88.9,61.9c1.2,0.8,2.3,1.9,4,1.7c0.2,2.2,2.2,2.8,3.7,3.8   c34,23.6,68,47,101.9,70.8c4.3,3,9.3,5.2,12.6,9.6c-1,1.3-2.4,1-3.7,1c-78.8,0-157.6-0.1-236.4-0.1c0.7-1,1.4-1.9,2.1-2.9   c2.2-0.7,4.2-1.6,5-4c4.2-0.6,6.7-3.6,9.3-6.5c-3.6,1.5-7,3.1-9.5,6.3c-2.2,0.7-4.2,1.6-5,4C136.6,368.2,135.4,368.6,134.1,369z    M194,329c0.3,0,0.6,0,1,0c1.3-0.7,2.9-1,3-3c0.8,0,1.6-0.2,2-1c0.3-0.3,0.7-0.7,1-1c0.8,0,1.6-0.2,2-1c0.1-0.2,0.3-0.3,0.4-0.5   c-0.2,0.1-0.3,0.3-0.5,0.4c-0.8,0-1.6,0.2-2,1c-0.3,0.3-0.7,0.7-1,1c-0.8,0-1.6,0.2-2,1c-1.4,0-2.4,0.7-3,2   C194.6,328.3,194.3,328.6,194,329c-0.2,0.1-0.4,0.2-0.5,0.4C193.7,329.3,193.9,329.2,194,329z M188,333c0.8,0,1.6-0.2,2-1   c0.8-0.1,1.6-0.2,1.5-1.2c0-0.1-0.2-0.3-0.3-0.3c-1.1-0.1-1.2,0.7-1.3,1.5C189.1,332,188.4,332.1,188,333c-0.4,0.3-0.7,0.6-1.1,0.9   c-0.8,0-1.6,0.2-2,1c-0.3,0.3-0.7,0.7-1,1c-0.8,0-1.6,0.2-2,1c-1.4,0.1-2.4,0.7-3,2c-0.3,0.3-0.6,0.7-1,1c-0.1,0.2-0.3,0.3-0.4,0.5   c0.2-0.1,0.3-0.3,0.5-0.4c0.8,0,1.6-0.2,2-1c1.2-0.1,1.9-0.7,2-2c0.8,0,1.6-0.2,2-1c0.3-0.3,0.7-0.7,1-1c0.8,0,1.6-0.2,2-1   C187.4,333.7,187.7,333.4,188,333z M172,344c-0.8,0.1-1.6,0.2-1.5,1.3c0,0.1,0.2,0.3,0.3,0.3C171.8,345.6,171.9,344.8,172,344   c0.9,0.1,1.6-0.1,2.1-0.9c0.8-0.1,1.6-0.2,1.5-1.3c0-0.1-0.2-0.3-0.3-0.3c-1.1-0.1-1.2,0.7-1.3,1.5C173.1,343,172.4,343.2,172,344z    M158.9,352.9c-1.4,0.1-2.4,0.8-3,2c-0.7,0.2-1.6,0.3-1.5,1.3c0,0.1,0.2,0.3,0.3,0.3c1,0.1,1.2-0.7,1.4-1.5c1.4,0,2.8-0.2,3-2   c0.8,0,1.5-0.2,2-1c1.4-0.1,2.4-0.8,3-2c0.7-0.2,1.6-0.2,1.5-1.3c0-0.1-0.2-0.3-0.3-0.3c-1.1-0.1-1.2,0.7-1.3,1.5   c-1.4,0-2.8,0.1-3,2C160.1,352,159.4,352.2,158.9,352.9z M168.7,347.2c-0.1-0.3-0.1-0.7-0.3-0.8c-0.2-0.1-0.6,0-0.8,0.2   c-0.3,0.4-0.2,0.9,0.4,0.9C168.1,347.6,168.4,347.4,168.7,347.2z"
                                  fill="#E6E3D6"
                                />
                                <path
                                  d="M388.1,143c-16.5,12.3-33,24.6-49.6,36.9c-26.2,19.4-52.5,38.6-78.7,58c-2.4,1.8-3.8,2-6.3,0.1   c-42-31.3-84.1-62.4-126.2-93.6c-0.5-0.4-0.9-0.9-1.4-1.4c54.6,0,109.2-0.1,163.9-0.1C322.5,143,355.3,143,388.1,143z"
                                  fill="#F6F4EC"
                                />
                                <path
                                  d="M376,370c-3.3-4.4-8.3-6.6-12.6-9.6c-33.9-23.7-68-47.2-101.9-70.8c-1.4-1-3.4-1.6-3.7-3.8   c3-3.7,7.3-5.7,11.1-8.3c36.6-25.3,73.3-50.4,110-75.6c0,56.3,0,112.6,0.1,168.9C378,370.7,377,370.3,376,370z"
                                  fill="#B6B5AC"
                                />
                                <path
                                  d="M379.1,371c0-56.3,0-112.6-0.1-168.9c11-7.9,21.9-15.7,32.9-23.6c0.9-0.7,1.8-1.5,3.1-1.5   c0.1,18.5,0.2,36.9,0.2,55.4c0,36.1,0,72.2,0,108.3c0,2.5,0,5-0.1,7.5c-0.6,12.4-6.6,19.4-18.6,21.7   C390.7,371,384.9,371.7,379.1,371z"
                                  fill="#B13A30"
                                />
                                <path
                                  d="M138.1,368.1c-0.7,1-1.4,1.9-2.1,2.9c-0.7,0-1.3,0-2,0.1c0-0.7,0.1-1.4,0.1-2.1c1.3-0.4,2.5-0.7,3.8-1.1   C137.9,367.9,138.1,368.1,138.1,368.1z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M142.9,363.9c2.5-3.1,5.9-4.8,9.5-6.3c-2.6,2.9-5.1,5.9-9.3,6.5L142.9,363.9z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M143.1,364.1c-0.9,2.4-2.9,3.3-5,4c0,0-0.2-0.2-0.2-0.2c0.8-2.4,2.9-3.3,5-4   C142.9,363.9,143.1,364.1,143.1,364.1z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M198,326c-0.1,1.9-1.8,2.2-3,3c0-0.3,0-0.7,0-1C195.6,326.7,196.6,326,198,326C198,326,198,326,198,326z"
                                  fill="#C5C3B9"
                                />
                                <path
                                  d="M178.9,339c0.6-1.3,1.6-2,3-2l0.1,0.1c0,1.3-0.7,1.9-2,2C179.7,339,179.3,339,178.9,339z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M164.1,350.1c-0.6,1.3-1.6,1.9-3,2c0,0-0.1-0.1-0.1-0.1c0.2-1.9,1.6-2,3-2L164.1,350.1z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M155.9,354.9c0.6-1.2,1.6-1.9,3-2l0.1,0.2c-0.2,1.9-1.5,2-3,2L155.9,354.9z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M173.9,342.9c0.1-0.8,0.3-1.6,1.3-1.5c0.1,0,0.3,0.2,0.3,0.3c0,1.1-0.8,1.1-1.5,1.3L173.9,342.9z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M172,344.1c-0.1,0.8-0.2,1.6-1.3,1.5c-0.1,0-0.3-0.2-0.3-0.3C170.4,344.1,171.2,344.1,172,344.1   C172,344,172,344.1,172,344.1z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M168.7,347.2c-0.2,0.1-0.5,0.4-0.7,0.4c-0.5-0.1-0.7-0.5-0.4-0.9c0.1-0.2,0.6-0.3,0.8-0.2   C168.5,346.6,168.6,346.9,168.7,347.2z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M163.9,349.9c0.1-0.8,0.3-1.5,1.3-1.5c0.1,0,0.3,0.2,0.3,0.3c0.1,1.1-0.8,1.1-1.5,1.3   C164.1,350.1,163.9,349.9,163.9,349.9z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M156.1,355.1c-0.2,0.8-0.3,1.5-1.4,1.5c-0.1,0-0.3-0.2-0.3-0.3c-0.1-1.1,0.8-1.1,1.5-1.3   C155.9,354.9,156.1,355.1,156.1,355.1z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M190,332c0.1-0.8,0.2-1.6,1.3-1.5c0.1,0,0.3,0.2,0.3,0.3C191.6,331.9,190.8,331.9,190,332L190,332z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M201,324c0.4-0.8,1.2-1,2-1l0,0C202.6,323.8,201.9,324,201,324L201,324z"
                                  fill="#C5C3B9"
                                />
                                <path
                                  d="M200,325c-0.4,0.8-1.2,1-2,1c0,0-0.1-0.1-0.1-0.1C198.4,325.2,199.1,325,200,325C200,325,200,325,200,325z"
                                  fill="#C5C3B9"
                                />
                                <path
                                  d="M185,335c0.4-0.8,1.2-1,2-1c0,0,0.1,0.1,0.1,0.1C186.6,334.8,185.9,335,185,335C185,335.1,185,335,185,335z   "
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M182,337c0.4-0.8,1.2-1,2-1l0.1,0.1C183.6,336.9,182.9,337,182,337C182,337,182,337,182,337z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M178.9,339c0.4,0,0.8,0,1.1,0c-0.5,0.8-1.2,1-2,1c0,0-0.1-0.1-0.1-0.1C178.3,339.6,178.6,339.3,178.9,339z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M174,343c-0.4,0.8-1.2,1-2,1c0,0-0.1-0.1-0.1-0.1c0.4-0.8,1.2-1,2-1C173.9,342.9,174,343,174,343z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M158.9,352.9c0.4-0.8,1.2-1,2-1c0,0,0.1,0.1,0.1,0.1c-0.4,0.8-1.2,1-2,1   C159.1,353.1,158.9,352.9,158.9,352.9z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M190,332c-0.4,0.8-1.1,1-2,1L188,333C188.4,332.1,189.1,332,190,332C190,332,190,332,190,332z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M203,323c0.2-0.1,0.3-0.3,0.5-0.4C203.3,322.7,203.2,322.9,203,323C203,323,203,323,203,323z"
                                  fill="#C5C3B9"
                                />
                                <path
                                  d="M201,324c-0.3,0.3-0.7,0.7-1,1c0,0-0.1-0.1-0.1-0.1C200.3,324.6,200.6,324.3,201,324   C201,324,201,324,201,324z"
                                  fill="#C5C3B9"
                                />
                                <path
                                  d="M195,328c0,0.3,0,0.7,0,1c-0.3,0-0.6,0.1-1,0L194,329C194.3,328.6,194.6,328.3,195,328z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M194,329c-0.2,0.1-0.3,0.3-0.5,0.4C193.7,329.3,193.8,329.1,194,329C194,329,194,329,194,329z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M184,336c0.3-0.3,0.7-0.7,1-1c0,0,0.1,0.1,0.1,0.1C184.7,335.4,184.4,335.7,184,336   C184,336,184,336,184,336z"
                                  fill="#C3C2B8"
                                />
                                <path
                                  d="M178,340c-0.2,0.1-0.3,0.3-0.5,0.4C177.7,340.3,177.8,340.1,178,340C178,340,178,340,178,340z"
                                  fill="#C1C0B6"
                                />
                                <path
                                  d="M188,333c-0.3,0.3-0.7,0.7-1,1c0,0-0.1-0.1-0.1-0.1C187.3,333.6,187.6,333.3,188,333   C188,333,188,333,188,333z"
                                  fill="#C3C2B8"
                                />
                              </g>
                            </svg>
                          </button>

                          <LinkedinShareButton
                            url={'https://remodelmate.com'}
                            title={'Remodelmate - $750 off your first project'}
                            summary={`Remodelmate is the easiest way to get a home renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>

                          <FacebookShareButton
                            url={`https://remodelmate.com`}
                            quote={`Remodelmate is the easiest way to get a home renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                            hashtag="#remodelmate"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>

                          <EmailShareButton
                            url={`https://remodelmate.com`}
                            subject={`Remodelmate - $750 off your first project`}
                            body={`Remodelmate is the easiest way to get a bathroom renovation project done. Use my referral code ${referralCode} to get $750 off your first project.`}
                          >
                            <EmailIcon size={32} round />
                          </EmailShareButton>
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
  )
}
