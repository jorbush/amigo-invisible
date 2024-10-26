'use client';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Amigo Invisible
        </h1>
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? (
            <FaMoon className="text-xl text-gray-800" />
          ) : (
            <FaSun className="text-xl text-white" />
          )}
        </button>
      </div>
    </header>
  );
};
