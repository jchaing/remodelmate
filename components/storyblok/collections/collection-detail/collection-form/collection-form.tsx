import {
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useClientIsLoggedIn } from '@utils/magic'
import { Form, Formik } from 'formik'
import {
  ActionModal,
  GenericFormField,
  GooglePlaceAutocomplete,
} from '@components/shared'
import { parseAddress } from '@utils/address'
import { ACTIVE_MARKETS, ACTIVE_ZIP_CODES } from '@lib/pricing/activeMarkets'
import { useRouter } from 'next/router'
import { useAddHomeowner, useGetHomeowner } from 'hooks/homeowner'
import { useCreateEstimate } from 'hooks/estimate'
import * as yup from 'yup'
import 'yup-phone-lite'
import { ROUTE_MAP } from '@utils/routes'
import { ADMIN_URL } from '@utils/links'
import { Layout } from '@lib/layout'

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
      .required('Phone number is required'),
    additional: yup.string(),
  })
}

export const CollectionForm: FunctionComponent<CollectionFormProps> = ({
  openForm,
  setOpenForm,
  collectionName,
}) => {
  const router = useRouter()
  const [addressObject, setAddressObject] = useState(null)
  const [addressError, setAddressError] = useState(null)
  const [field, setField] = useState<string>('')
  const [homeownerErrorMsg, setHomeownerErrorMsg] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data: isLoggedIn } = useClientIsLoggedIn()
  const { data: homeowner }: { data: Homeowner } = useGetHomeowner()

  const addHomeownerMutation = useAddHomeowner({
    onSuccess: async (_data: any, variables: any) => {
      // do something with variables
    },
    onError: (error: any) => {
      console.error('***ERROR***', error)

      if (error.keyValue.email) {
        setField('email')
        setHomeownerErrorMsg(
          `It appears ${error.keyValue.email} already exists, please sign-in to your account to create an estimate`
        )
      }

      if (error.keyValue.phone) {
        setField('phone')
        setHomeownerErrorMsg(
          `It appears ${error.keyValue.phone} already exists, please sign-in to your account to create an estimate`
        )
      }
    },
  })

  const createEstimateMutation = useCreateEstimate({
    onSuccess: async (_data: any) => {
      const { firstName, lastName, email, phone } = _data
      const {
        _id,
        address: { street, city, state, zip, additional },
        milestones,
        totalCost,
        collectionName,
        layout
      } = _data.estimate

      let milestoneString = ``
      milestones.forEach(
        (milestone) =>
          (milestoneString += `* _${milestone.name} $${milestone.price}_\n`)
      )

      const slackMessageBody = {
        blocks: [
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `<${ADMIN_URL}/estimates/${_id}|*🎉 New Estimate Built*>`,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Homeowner:* \n_${firstName} ${lastName}_\n`,
              },
              {
                type: 'mrkdwn',
                text: `*Email:* \n_${email}_\n`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `\n*Address:* \n_${street} ${additional}_ \n_${city}, ${state} ${zip}_`,
              },
              {
                type: 'mrkdwn',
                text: `\n*Phone:* \n_${phone}_\n`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `_*${collectionName} - ${layout}:*_ \n${milestoneString}`,
              },
              {
                type: 'mrkdwn',
                text: `*Estimate Total:* \n_$${totalCost}_`,
              },
            ],
          },
          {
            type: 'divider',
          },
        ],
      }

      try {
        const sendSlackMessage = await fetch('/api/slack/newEstimate', {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(slackMessageBody),
        })
        await sendSlackMessage.json()
      } catch (error) {
        new Error(error)
      }

      if (isLoggedIn) {
        setOpenForm(false)
        router.replace(
          `${ROUTE_MAP.dashboard.projectBook}/${_data.estimate._id}`
        )
      } else {
        setModalOpen(true)
      }
    },
    onError: (error: any) => {
      console.error('***ERROR***', error)
    },
  })

  const onModalClick = async (e: any) => {
    setModalOpen(false)
    setOpenForm(false)

    router.replace(ROUTE_MAP.auth.signIn)
  }

  let initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    layout: 'powderRoom',
    additional: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={!isLoggedIn ? signupValidationSchema() : null}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        // Error handling for Google Address
        if (addressError) return setAddressError(addressError)
        if (!addressObject)
          return setAddressError('Please enter your home address')

        const { place_id, url, address_components } = addressObject
        const parsedAddress = parseAddress(address_components)
        const addressData = {
          ...parsedAddress,
          place_id,
          url,
          additional: values.additional,
        }

        const activeZipCodesSet = new Set(ACTIVE_ZIP_CODES)

        let activeMarket = { market: '' }

        ACTIVE_MARKETS.forEach((market) => {
          if (market.zipCodes.includes(Number(addressData.zip))) {
            activeMarket.market = market.name
          }
        })

        const { firstName, lastName, email, phone, layout } = values
        const { street, city, state, zip, additional } = addressData

        const homeownerBody = {
          firstName,
          lastName,
          email,
          phone,
          street,
          city,
          state,
          zip,
          additional,
        }

        if (!activeZipCodesSet.has(Number(addressData.zip))) {
          return setAddressError(
            `Market for Zip Code ${addressData.zip} is currently not available`
          )
        }

        if (!isLoggedIn) {
          const newHomeowner = await addHomeownerMutation.mutateAsync(
            homeownerBody
          )

          if (newHomeowner) {
            await createEstimateMutation.mutateAsync({
              phone: newHomeowner._doc.phone,
              collectionName,
              layout,
              ...addressData,
              ...activeMarket,
            })
          }
        } else {
          await createEstimateMutation.mutateAsync({
            phone: homeowner.phone,
            collectionName,
            layout,
            ...addressData,
            ...activeMarket,
          })
        }

        setHomeownerErrorMsg('')
      }}
    >
      {({ isSubmitting, handleReset }) => (
        <Transition.Root show={openForm} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => null}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                      <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll">
                          <div className="bg-sky-700 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-white">
                                {/* {FormTypeTitles[formType]} */}
                                {collectionName} Estimate
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                  onClick={() => {
                                    handleReset()
                                    setHomeownerErrorMsg('')
                                    setAddressError(null)
                                    setOpenForm(false)
                                  }}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm text-sky-300">
                                Get started by selecting the layout and enter in
                                the information below to create your new
                                project.
                              </p>
                            </div>
                          </div>
                          <div className="relative mt-6 mb-6 flex-1 px-4 sm:px-6">
                            {/* Form content goes here */}
                            <Form>
                              <fieldset>
                                <legend className="py-2 text-lg font-medium leading-6 text-gray-900">
                                  Layout
                                </legend>
                                <div className="mt-2 space-y-4">
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <GenericFormField
                                        id="powderRoom"
                                        name="layout"
                                        aria-describedby="powderRoom-description"
                                        type="radio"
                                        value="powderRoom"
                                        className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                                        defaultChecked
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="powderRoom"
                                        className="font-medium text-gray-900"
                                      >
                                        Powder Room
                                      </label>
                                      <p
                                        id="powderRoom-description"
                                        className="text-gray-500"
                                      >
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Ratione totam, vero
                                        vitae atque natus necessitatibus saepe
                                        doloremque modi nam iure assumenda?
                                        Provident aut magni pariatur dolor
                                        asperiores obcaecati veniam aperiam!
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex h-6 items-center">
                                        <GenericFormField
                                          id="tubAndShowerCombo"
                                          name="layout"
                                          aria-describedby="tubAndShowerCombo-description"
                                          type="radio"
                                          value="tubAndShowerCombo"
                                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                                        />
                                      </div>
                                      <div className="pl-7 text-sm leading-6">
                                        <label
                                          htmlFor="tubAndShowerCombo"
                                          className="font-medium text-gray-900"
                                        >
                                          Tub & Shower Combo
                                        </label>
                                        <p
                                          id="tubAndShowerCombo-description"
                                          className="text-gray-500"
                                        >
                                          Lorem ipsum dolor sit amet,
                                          consectetur adipisicing elit. Placeat,
                                          fugiat sunt consectetur voluptate ex
                                          quod inventore mollitia nihil facere
                                          laboriosam maiores esse a eveniet,
                                          iste magnam neque perferendis
                                          repudiandae. Facere.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex h-6 items-center">
                                        <GenericFormField
                                          id="showerOnly"
                                          name="layout"
                                          aria-describedby="showerOnly-description"
                                          type="radio"
                                          value="showerOnly"
                                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                                        />
                                      </div>
                                      <div className="pl-7 text-sm leading-6">
                                        <label
                                          htmlFor="showerOnly"
                                          className="font-medium text-gray-900"
                                        >
                                          Shower Only
                                        </label>
                                        <p
                                          id="showerOnly-description"
                                          className="text-gray-500"
                                        >
                                          Lorem ipsum dolor, sit amet
                                          consectetur adipisicing elit. Dolore
                                          officia aut fuga deleniti obcaecati
                                          enim nam rem, explicabo vitae id
                                          delectus provident iusto quibusdam
                                          odit tempore sed quod perferendis?
                                          Molestiae?
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="relative flex items-start">
                                      <div className="absolute flex h-6 items-center">
                                        <GenericFormField
                                          id="separateTubAndShower"
                                          name="layout"
                                          aria-describedby="separateTubAndShower-description"
                                          type="radio"
                                          value="separateTubAndShower"
                                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                                        />
                                      </div>
                                      <div className="pl-7 text-sm leading-6">
                                        <label
                                          htmlFor="separateTubAndShower"
                                          className="font-medium text-gray-900"
                                        >
                                          Separate Tub & Shower
                                        </label>
                                        <p
                                          id="separateTubAndShower-description"
                                          className="text-gray-500"
                                        >
                                          Lorem ipsum dolor sit amet consectetur
                                          adipisicing elit. Soluta sapiente
                                          nobis placeat in debitis maiores
                                          delectus doloremque tenetur beatae
                                          inventore dolore atque expedita unde
                                          officiis corporis iste eligendi, vero
                                          magni.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>

                              <section>
                                <div className="py-2 pt-10 text-lg font-medium leading-6 text-gray-900">
                                  Address
                                </div>
                                <GooglePlaceAutocomplete
                                  setAddressObject={setAddressObject}
                                  setAddressError={setAddressError}
                                  addressError={addressError}
                                />
                                <GenericFormField
                                  id="additional"
                                  name="additional"
                                  type="text"
                                  placeholder="Unit/Suite (optional)"
                                  className="mt-4 block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-slate-900"
                                />
                              </section>

                              {!isLoggedIn ? (
                                <section>
                                  <div className="py-2 pt-10 text-lg font-medium leading-6 text-gray-900">
                                    Profile
                                  </div>
                                  <div className="mb-4 min-w-0 flex-1">
                                    <GenericFormField
                                      name="firstName"
                                      placeholder="First name"
                                      type="text"
                                    />
                                  </div>
                                  <div className="mb-4 min-w-0 flex-1">
                                    <GenericFormField
                                      name="lastName"
                                      placeholder="Last name"
                                      type="text"
                                    />
                                  </div>
                                  <div className="mb-4 min-w-0 flex-1">
                                    <GenericFormField
                                      name="email"
                                      placeholder="Email"
                                      type="email"
                                    />
                                    {field === 'email' ? (
                                      <p className="mt-1 block text-sm text-red-600">
                                        {homeownerErrorMsg}
                                      </p>
                                    ) : null}
                                  </div>
                                  <div className="mb-4 min-w-0 flex-1">
                                    <GenericFormField
                                      name="phone"
                                      placeholder="Mobile number"
                                      type="tel"
                                    />
                                    {field === 'phone' ? (
                                      <p className="mt-1 block text-sm text-red-600">
                                        {homeownerErrorMsg}
                                      </p>
                                    ) : null}
                                  </div>
                                </section>
                              ) : null}

                              <div className="flex flex-shrink-0 justify-end py-12">
                                <button
                                  disabled={isSubmitting}
                                  type="button"
                                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                  onClick={() => {
                                    handleReset()
                                    setHomeownerErrorMsg('')
                                    setAddressError(null)
                                    setOpenForm(false)
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  disabled={isSubmitting}
                                  type="submit"
                                  className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                  {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                              </div>
                            </Form>
                            <ActionModal
                              message={`You have successfully created an account and quote for the ${collectionName} Collection. Please click the button below to sign-in and view your quote.`}
                              modalOpen={modalOpen}
                              action={onModalClick}
                              actionText={'Sign-in'}
                            />
                            {/* <div>
                          {formType === 'Personal' ? (
                            <UpdatePersonal
                            contractor={contractor}
                            setOpenForm={setOpenForm}
                            />
                            ) : null}
                            {formType === 'Company' ? (
                              <UpdateCompany
                              contractor={contractor}
                              setOpenForm={setOpenForm}
                              />
                              ) : null}
                              {formType === 'State License' ? (
                            <StateLicenseForm
                              contractor={contractor}
                              setOpenForm={setOpenForm}
                              isAddNew={true}
                              />
                              ) : null}
                              {formType === 'Local License' ? (
                                <LocalLicenseForm
                                contractor={contractor}
                                setOpenForm={setOpenForm}
                                isAddNew={true}
                                />
                                ) : null}
                                {formType === 'Insurance Policy' ? (
                            <InsurancePolicyForm
                              contractor={contractor}
                              setOpenForm={setOpenForm}
                              isAddNew={true}
                              />
                              ) : null}
                              {formType === 'Update State License' ? (
                                <UpdateStateLicense
                              contractor={contractor}
                              setOpenForm={setOpenForm}
                              document={document}
                              />
                              ) : null}
                              {formType === 'Update Local License' ? (
                            <UpdateLocalLicense
                              contractor={contractor}
                              setOpenForm={setOpenForm}
                              document={document}
                              />
                              ) : null}
                              {formType === 'Update Insurance Policy' ? (
                                <UpdateInsurancePolicy
                                contractor={contractor}
                                setOpenForm={setOpenForm}
                                document={document}
                                />
                                ) : null}
                              </div> */}
                            {/* <pre>{JSON.stringify(finalValues, null, 2)}</pre> */}
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </Formik>
  )
}

interface CollectionFormProps {
  // contractor: Contractor
  openForm: boolean
  setOpenForm: Dispatch<SetStateAction<boolean>>
  collectionName: string
  // formType:
  //   | 'Personal'
  //   | 'Company'
  //   | 'State License'
  //   | 'Local License'
  //   | 'Insurance Policy'
  //   | 'Update State License'
  //   | 'Update Local License'
  //   | 'Update Insurance Policy'
  // document: Record<string, string>
}
