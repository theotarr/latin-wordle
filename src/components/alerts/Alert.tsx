import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'warning' | 'info'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed top-20 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-rose-200': variant === 'warning',
      'bg-green-200': variant === 'success',
      'bg-blue-200': variant === 'info',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-4">
          <p
            dangerouslySetInnerHTML={{ __html: message }}
            className="text-sm text-center font-medium text-gray-900"
          ></p>
        </div>
      </div>
    </Transition>
  )
}
