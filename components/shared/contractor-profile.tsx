import formatPhoneNumber from '@utils/phone'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'

const formatPhoneForDisplay = (phone: any) => {
  const phoneString = formatPhoneNumber(phone)

  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  if (!phoneRegex.test(phoneString)) return 'Invalid Phone Number'

  return phoneString.replace(phoneRegex, '($1) $2-$3')
}

const backgroundCheckStatusToString = (status: string) => {
  let statusString: string
  switch (status) {
    case 'notStarted':
      statusString = 'Not Started'
      break
    case 'inProgress':
      statusString = 'In Progress'
      break
    case 'passed':
      statusString = 'Passed'
      break
    case 'failed':
      statusString = 'Failed'
      break
    default:
      statusString = 'No Status Found 🤷'
      break
  }

  return statusString
}

const displayCategory = (category: string) => {
  switch (category) {
    case 'general':
      return 'General Contractor'
    case 'design':
      return 'Designer'
    default:
      return 'No Category'
  }
}

export const ContractorProfile: FunctionComponent<ContractorProfileProps> = ({
  contractor,
}) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    category,
    description,
    profileImage,
    companyName,
    companyAddress,
    backgroundCheckStatus = 'no match',
  } = contractor

  const { street, city, state, zip } = companyAddress
  // const { insuranceVerified, insuranceImage } = insurancePolicy

  const imgAlt =
    `${firstName?.toLowerCase()}-${lastName?.toLowerCase()}` || null

  return (
    <div className="space-y-6 sm:space-y-8 lg:gap-8">
      <div className="grid grid-cols-4 items-start gap-6 space-y-6">
        <div className="col-span-2">
          <div className="aspect-w-3 aspect-h-3 sm:aspect-w-4 sm:aspect-h-4">
            <Image
              className="rounded-lg object-cover shadow-lg"
              src={profileImage}
              alt={imgAlt}
              fill
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="space-y-1 text-lg font-medium leading-6">
            <h3>
              {firstName} {lastName}
            </h3>
            <p className="text-indigo-600">{formatPhoneForDisplay(phone)}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-y-6">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd className="mt-1 text-sm text-gray-900">{companyName}</dd>
          </div>

          <div className="border-t border-gray-200 sm:col-span-1 sm:border-none">
            <dt className="mt-4 text-sm font-medium text-gray-500 sm:mt-0">
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <p>{street}</p>
              <p>
                {city}, {state} {zip}
              </p>
            </dd>
          </div>

          <div className="border-t border-gray-200 sm:col-span-1 sm:border-none">
            <dt className="mt-4 text-sm font-medium text-gray-500 sm:mt-0">
              Category
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {displayCategory(category)}
            </dd>
          </div>

          <div className="border-t border-gray-200 sm:col-span-1 sm:border-none">
            <dt className="mt-4 text-sm font-medium text-gray-500 sm:mt-0">
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{email}</dd>
          </div>

          <div className="border-t border-gray-200 sm:col-span-2 sm:border-none">
            <dt className="mt-4 text-sm font-medium text-gray-500 sm:mt-0">
              About
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {description || 'No description provided'}
            </dd>
          </div>

          <div className="border-t border-gray-200 sm:col-span-2 sm:border-none">
            <dt className="mt-4 text-sm font-medium text-gray-500 sm:mt-0">
              Credentials
            </dt>

            <dd className="mt-1 text-sm text-gray-900">
              <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                {/* // INFO: CONTRACTOR'S LICENSES */}

                {contractor.contractorsLicense.length > 0 &&
                  contractor.contractorsLicense?.map((license) => {
                    const { licenseVerified, licenseImage } = license

                    return (
                      <>
                        {license && licenseVerified ? (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-green-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Contractor&apos; License
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={licenseImage}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                View
                              </a>
                            </div>
                          </li>
                        ) : (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-indigo-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Contractor&apos; License
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="font-medium text-gray-400 hover:text-gray-300">
                                None
                              </span>
                            </div>
                          </li>
                        )}
                      </>
                    )
                  })}

                {/* // INFO: LOCAL LICENSES */}

                {contractor.localLicense.length > 0 &&
                  contractor.localLicense?.map((license) => {
                    const { licenseVerified, licenseImage } = license

                    return (
                      <>
                        {license && licenseVerified ? (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-green-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Local License
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={licenseImage}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                View
                              </a>
                            </div>
                          </li>
                        ) : (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-indigo-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Local License
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="font-medium text-gray-400 hover:text-gray-300">
                                None
                              </span>
                            </div>
                          </li>
                        )}
                      </>
                    )
                  })}

                {/* // INFO: INSURANCE POLICIES */}

                {contractor.insurancePolicy.length > 0 &&
                  contractor.insurancePolicy?.map((policy) => {
                    const { insuranceVerified, insuranceImage } = policy

                    return (
                      <>
                        {policy && insuranceVerified ? (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-green-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Insurance Policy
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={insuranceImage}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                View
                              </a>
                            </div>
                          </li>
                        ) : (
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <div
                                className="h-5 w-5 flex-shrink-0 text-indigo-600"
                                aria-hidden="true"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <span className="ml-2 h-5 w-0 flex-1 truncate">
                                Contractor&apos; License
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="font-medium text-gray-400 hover:text-gray-300">
                                None
                              </span>
                            </div>
                          </li>
                        )}
                      </>
                    )
                  })}

                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    {backgroundCheckStatus === 'passed' ? (
                      <>
                        <div className="flex w-0 flex-1 items-center">
                          <div
                            className="h-5 w-5 flex-shrink-0 text-green-600"
                            aria-hidden="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <span className="ml-2 h-5 w-0 flex-1 truncate">
                            Background Check
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex w-0 flex-1 items-center">
                          <div
                            className="h-5 w-5 flex-shrink-0 text-indigo-600"
                            aria-hidden="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <span className="ml-2 h-5 w-0 flex-1 truncate">
                            Background Check
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="ml-4 flex-shrink-0">
                    <span className="font-medium text-gray-400">
                      {backgroundCheckStatusToString(backgroundCheckStatus)}
                    </span>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default ContractorProfile

interface ContractorProfileProps {
  contractor: Contractor
}
