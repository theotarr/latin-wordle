export const Footer = () => {
  return (
    <footer className="mt-8 mb-4 px-4">
      <div className="flex flex-col items-center gap-2 text-sm dark:text-gray-400 text-gray-600">
        <div className="flex items-center gap-4">
          <a
            href="https://connections.latindictionary.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold dark:text-white text-gray-900 hover:opacity-80 transition-opacity"
          >
            Conexus
          </a>
          <span className="dark:text-gray-500 text-gray-400">•</span>
          <a
            href="https://www.latindictionary.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold dark:text-white text-gray-900 hover:opacity-80 transition-opacity"
          >
            latindictionary.io
          </a>
        </div>
      </div>
    </footer>
  );
};

