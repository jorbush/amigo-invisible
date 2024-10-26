import { FaGithub, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4">
        <a
          href="https://github.com/jorbush"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="mailto:jbonetv5@gmail.com"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
        >
          <FaEnvelope size={24} />
        </a>
      </div>
    </footer>
  );
};
