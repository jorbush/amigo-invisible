import { FaGithub, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="w-full p-6">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-6">
                <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:opacity-70 dark:text-white"
                >
                    <FaGithub size={24} />
                </a>
                <a
                    href="mailto:your@email.com"
                    className="text-black hover:opacity-70 dark:text-white"
                >
                    <FaEnvelope size={24} />
                </a>
            </div>
        </footer>
    );
};
