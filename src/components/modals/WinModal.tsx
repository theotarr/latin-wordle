import { CheckIcon } from "@heroicons/react/24/outline";
import { MiniGrid } from "../mini-grid/MiniGrid";
import { shareStatus } from "../../lib/share";
import { BaseModal } from "./BaseModal";
import { solution } from "../../lib/words";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  guesses: string[];
  handleShare: () => void;
};

const DefinitionURL = `https://www.latindictionary.io/dictionary?q=${solution}`;

export const WinModal = ({
  isOpen,
  handleClose,
  guesses,
  handleShare,
}: Props) => {
  return (
    <BaseModal title="You won!" isOpen={isOpen} handleClose={handleClose}>
      <div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
          <CheckIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <MiniGrid guesses={guesses} />
          </div>
          <div className="mt-4 dark:text-white">
            View the definition of{" "}
            <span className="font-semibold">"{solution}"</span> on{" "}
            <a
              href={DefinitionURL}
              target="_blank"
              rel="noopener noreferrer"
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
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
          onClick={() => {
            shareStatus(guesses, false);
            handleShare();
          }}
        >
          Share
        </button>
      </div>
    </BaseModal>
  );
};
