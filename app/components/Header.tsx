'use client';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Amigo Invisible
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? (
            <FaMoon className="text-gray-800 text-xl" />
          ) : (
            <FaSun className="text-white text-xl" />
          )}
        </button>
      </div>
    </header>
  );
};
