import clsx from 'clsx'
import { FunctionComponent } from 'react'

export const ActionModal: FunctionComponent<ActionModalProps> = ({
  message,
  modalOpen,
  closeModal,
  action,
  actionText,
}) => {
  return (
    <div
      className={clsx(
        modalOpen ? 'modal-open' : '',
        'modal modal-bottom sm:modal-middle'
      )}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">{message}</h3>
        <div className="modal-action">
          {closeModal ? (
            <button
              className="btn inline-flex rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm"
              onClick={closeModal}
            >
              Close
            </button>
          ) : null}
          {action && actionText ? (
            <button
              className="btn inline-flex rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm"
              onClick={action}
            >
              {actionText}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

interface ActionModalProps {
  message: string
  modalOpen: boolean
  closeModal?: any
  action?: any
  actionText?: string
}
