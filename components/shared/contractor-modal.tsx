import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { Fragment, FunctionComponent, useState } from 'react'
import ContractorProfile from './contractor-profile'

interface ContractorModalProps {
  contractor: Contractor
}

export const ContractorModal: FunctionComponent<ContractorModalProps> = ({
  contractor,
}) => {
  const [open, setOpen] = useState(false)

  const { profileImage, firstName, lastName } = contractor || {}
  const imgAlt =
    `${firstName?.toLowerCase()}-${lastName?.toLowerCase()}` || null

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  return contractor ? (
    <>
      <button
        type="button"
        className="group block w-fit justify-start"
        onClick={handleOpenModal}
      >
        <div className="inline-block h-14 w-14 rounded-full lg:h-10 lg:w-10">
          <Image
            width={56}
            height={56}
            alt={imgAlt}
            src={profileImage}
            className="inline-block rounded-full"
          />
        </div>

        <div className="align-middle lg:ml-4 lg:inline-block">
          <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900 lg:text-start">
            {firstName}
          </p>
          <p className="hidden text-start align-middle text-xs font-medium text-gray-700 group-hover:text-gray-900 lg:block">
            {lastName}
          </p>
        </div>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-xl sm:p-6">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={handleCloseModal}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 px-4">
                      <Dialog.Title
                        as="h2"
                        className="text-2xl font-bold tracking-tight"
                      >
                        Contractor
                      </Dialog.Title>
                      <div className="mt-1">
                        <p className="text-base text-gray-500">
                          Meet your verified contractor
                        </p>
                      </div>
                      <Dialog.Description className="mt-4">
                        <ContractorProfile contractor={contractor} />
                      </Dialog.Description>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  ) : (
    <span>None</span>
  )
}

export default ContractorModal
