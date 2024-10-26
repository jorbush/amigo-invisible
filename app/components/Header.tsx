'use client';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from './ThemeProvider';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full p-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Amigo Invisible
        </h1>
        <button
          onClick={toggleTheme}
          className="absolute right-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'light' ? (
            <MdDarkMode className="text-black" size={'25px'}/>
          ) : (
            <MdLightMode className="text-white" size={'25px'}/>
          )}
        </button>
      </div>
    </header>
  );
};
