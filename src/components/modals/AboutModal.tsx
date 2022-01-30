import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is an implementation of Wordle in Latin -{' '}
        <a
          href="https://github.com/theotarr/latin-wordle"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          check out the code here
        </a>{' '}
        and{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          play the original English version here.
        </a>
      </p>
      <h4 className="text-lg leading-6 font-medium text-gray-900 mt-3">
        Support Us
      </h4>
      <p className="text-sm text-gray-500">
        If you find this useful, please sign up on{' '}
        <a
          href="https://www.latindictionary.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          latindictionary.io
        </a>{' '}
        and share it with your friends!
      </p>
      <h4 className="text-lg leading-6 font-medium text-gray-900 mt-3">
        Report a Problem
      </h4>
      <p className="text-sm text-gray-500">
        If you find a problem, please contact{' '}
        <a
          href="mailto:support@latindictionary.io"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold  underline"
        >
          us.
        </a>
      </p>
      {/* 
      <h2 className="text-lg leading-6 font-medium text-gray-900 mt-6">
        Special Thanks
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Contributors:
        <ul className="mt-2">
          <li>
            <a href="https://github.com/theotarr/" className="font-bold">
              Theo Tarr
            </a>
          </li>
          <li>
            <a href="https://github.com/stillabe/" className="font-bold">
              stillabe
            </a>
          </li>
        </ul>
      </p> */}
    </BaseModal>
  )
}
