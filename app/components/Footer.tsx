import { FaGithub, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full p-4 bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-4">
        <a
          href="https://github.com/jorbush"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="mailto:jbonetv5@gmail.com"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <FaEnvelope size={24} />
        </a>
      </div>
    </footer>
  );
};
