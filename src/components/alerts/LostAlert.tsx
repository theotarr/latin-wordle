import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { getLatinDefinition } from "../../lib/words";

type Props = {
  isOpen: boolean;
  solution: string;
};

export const LostAlert = ({ isOpen, solution }: Props) => {
  const definitionUrl = getLatinDefinition(solution);

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
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-rose-200">
        <div className="p-4">
          <p className="text-sm text-center font-medium text-gray-900">
            You lost. The correct word was{" "}
            <span className="font-latin font-semibold">{solution}</span>.{" "}
            <a
              href={definitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-gray-700"
            >
              Click here
            </a>{" "}
            to see the definition of{" "}
            <span className="font-latin">{solution}</span> on{" "}
            <a
              href="https://www.latindictionary.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-gray-700"
            >
              latindictionary.io
            </a>
            .
          </p>
        </div>
      </div>
    </Transition>
  );
};
