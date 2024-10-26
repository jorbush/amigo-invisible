import { FaGithub, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full p-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-6">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white hover:opacity-70"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="mailto:your@email.com"
          className="text-black dark:text-white hover:opacity-70"
        >
          <FaEnvelope size={24} />
        </a>
      </div>
    </footer>
  );
};
