'use client';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from './ThemeProvider';

export const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="w-full p-6">
            <div className="relative mx-auto flex max-w-7xl items-center justify-center">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Amigo Invisible
                </h1>
                <button
                    onClick={toggleTheme}
                    className="absolute right-0 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {theme === 'light' ? (
                        <MdLightMode
                            className="text-black"
                            size={'25px'}
                        />
                    ) : (
                        <MdDarkMode
                            className="text-white"
                            size={'25px'}
                        />
                    )}
                </button>
            </div>
        </header>
    );
};
