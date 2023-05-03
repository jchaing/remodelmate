import { Dispatch, Fragment, FunctionComponent, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
// import {
//   UpdateCompany,
//   UpdateInsurancePolicy,
//   UpdateLocalLicense,
//   UpdatePersonal,
//   UpdateStateLicense,
// } from '@components/profile/update-forms'
// import { StateLicenseForm } from '@components/onboarding/forms/state-license-form'
// import {
//   InsurancePolicyForm,
//   LocalLicenseForm,
// } from '@components/onboarding/forms'

enum FormTypeTitles {
  'Personal' = 'Update Profile',
  'Company' = 'Update Profile',
  'State License' = 'Add State License',
  'Local License' = 'Add Local License',
  'Insurance Policy' = 'Add Insurance Policy',
  'Update State License' = 'Update State License',
  'Update Local License' = 'Update Local License',
  'Update Insurance Policy' = 'Update Insurance Policy',
}

export const CollectionForm: FunctionComponent<CollectionFormProps> = ({
  // contractor,
  openForm,
  setOpenForm,
  // formType,
  // document,
}) => {
  return (
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
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {/* {FormTypeTitles[formType]} */}
                            Testing Title
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpenForm(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 mb-6 flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div>HELLO SLIDEOUT</div>
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
  )
}

interface CollectionFormProps {
  // contractor: Contractor
  openForm: boolean
  setOpenForm: Dispatch<SetStateAction<boolean>>
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
