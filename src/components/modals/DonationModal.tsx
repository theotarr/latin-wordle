import { useEffect, useState } from "react";
import { BaseModal } from "./BaseModal";

const STORAGE_KEY = "donation_popup_seen";
const DAYS_TO_WAIT = 3;
const STRIPE_DONATE_LINK = "https://donate.stripe.com/eVq8wO1NTc3W8TRg4gaIM00";

export const DonationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check local storage to see if we should show the modal
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const now = new Date().getTime();

    if (!lastSeen) {
      // First time, show it after a delay
      const timer = setTimeout(() => setIsOpen(true), 15000);
      return () => clearTimeout(timer);
    }

    const lastSeenTime = parseInt(lastSeen);
    const daysSince = (now - lastSeenTime) / (1000 * 60 * 60 * 24);

    if (daysSince > DAYS_TO_WAIT) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, new Date().getTime().toString());
  };

  return (
    <BaseModal
      title="Please read: A personal appeal"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-4 text-left">
        <div className="text-gray-900 dark:text-gray-100">
          <p className="mb-3">
            We&apos;ll get straight to the point: we ask you to help us keep{" "}
            <b>latindictionary.io</b> online.
          </p>
          <p className="mb-3">
            We&apos;re a small project dedicated to keeping Latin resources free
            and accessible to everyone. Over 99% of our users don&apos;t
            contribute, but if only 1% of our users donated $1, we would be
            able to cover our expenses and eventually go <b>ad-free</b>.
          </p>
          <p>
            If latindictionary.io has helped you translate a tricky passage or
            learn a new word, please consider making a small donation to keep us
            running.
          </p>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <a
            href={STRIPE_DONATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-sky-500 px-6 py-2 text-base font-semibold text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Donate $1
          </a>
        </div>
      </div>
    </BaseModal>
  );
};

