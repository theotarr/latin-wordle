import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200 transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75" aria-hidden="true" />
        </Transition.Child>
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transition-all"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200 transition-all"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="mx-auto max-w-sm rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 shadow-xl relative transform">
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                >
                  <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="text-center">
                <DialogTitle className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {title}
                </DialogTitle>
                <div className="mt-2">{children}</div>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
