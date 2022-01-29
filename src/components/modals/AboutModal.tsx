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
        >
          check out the code here
        </a>{' '}
        and{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          play the original English version here.
        </a>
      </p>

      <h2 className="text-lg leading-6 font-medium text-gray-900 mt-6">
        Special Thanks
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        This project was created by:
        <ul className="mt-2">
          <li>
            <a
              href="https://github.com/theotarr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Theo Tarr
            </a>
          </li>
          <li>
            <a
              href="https://github.com/stillabe/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              stillabe
            </a>
          </li>
        </ul>
      </p>
    </BaseModal>
  )
}
