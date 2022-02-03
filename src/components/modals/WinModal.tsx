import { Dialog } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { shareStatus } from '../../lib/share'
import { BaseModal } from './BaseModal'
import { solution } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  handleShare: () => void
}

const DefinitionURL = `https://www.latindictionary.io/words/?word=${solution}`

export const WinModal = ({
  isOpen,
  handleClose,
  guesses,
  handleShare,
}: Props) => {
  return (
    <BaseModal title="You won!" isOpen={isOpen} handleClose={handleClose}>
      <div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          ></Dialog.Title>
          <div className="mt-2">
            <MiniGrid guesses={guesses} />
          </div>
          <div className="mt-4 dark:text-white">
            View the definition of {solution} on{' '}
            <a
              href={DefinitionURL}
              target="_blank"
              rel="noopenner noreferrer"
              className="font-bold"
            >
              latindictionary.io
            </a>
            .
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => {
            shareStatus(guesses)
            handleShare()
          }}
        >
          Share
        </button>
      </div>
    </BaseModal>
  )
}
