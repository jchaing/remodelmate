import { XCloseButton } from '@assets/XCloseButton'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, FunctionComponent, SetStateAction } from 'react'

export const ImageEnlarge: FunctionComponent<ImageEnlargeProps> = ({
  imgSrc,
  open,
  setOpen,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative max-w-lg transform overflow-hidden rounded-lg shadow-xl transition-all hover:cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <div className="relative -mb-12 flex justify-end pr-3 pt-3">
                  <XCloseButton />
                </div>
                <img src={imgSrc} alt={imgSrc} className="rounded-lg" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

interface ImageEnlargeProps {
  imgSrc: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
