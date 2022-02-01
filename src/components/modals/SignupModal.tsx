import { UserAddIcon } from '@heroicons/react/outline'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SignupModal = ({ isOpen, handleClose }: Props) => {
  // set a new property in localStorage to indicate that the user has signed up
  const onClick = () => {
    localStorage.setItem('hasSignedUp', 'true')
  }

  return (
    <BaseModal title="Sign Up" isOpen={isOpen} handleClose={handleClose}>
      <div>
        <div className="mx-auto my-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <UserAddIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
        </div>
        <p className="dark:text-white">
          If you are enjoying playing Latin Wordle, please consider signing up
          to get access extra features, such as multi-word lookups and
          personalized word lists. It is completely <b>free</b>, and helps us to
          continue improving our games and services.
        </p>
        <div className="mt-5 sm:mt-6">
          <a
            href="https://www.latindictionary.io/register"
            target="_blank"
            rel="noopenner noreferrer"
          >
            <button
              type="button"
              onClick={onClick}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </BaseModal>
  )
}
