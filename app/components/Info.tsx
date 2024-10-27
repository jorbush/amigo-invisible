'use client';
import { IoInformationCircle } from 'react-icons/io5';

interface InfoProps {
    text: string;
}

export const Info = ({ text }: InfoProps) => {
    return (
        <div className="group relative inline">
            <IoInformationCircle
                className="cursor-help text-gray-800 hover:text-gray-700 dark:text-white hover:dark:text-neutral-200"
                size={15}
            />
            <div className="absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg bg-neutral-50 p-2 text-sm shadow-lg group-hover:block dark:bg-gray-800 dark:text-white">
                {text}
            </div>
        </div>
    );
};
