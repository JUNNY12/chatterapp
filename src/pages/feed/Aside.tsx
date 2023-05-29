'use client';

import { Recent } from './Recent';
import { Trending } from './Trending';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Aside = (): React.JSX.Element => {
    const { theme } = useThemeContext();

    return (
        <aside
            className={`h-full p-8 ms-8 my-8 transition duration-500 ease-in-out  
        ${
            theme === 'lightMode'
                ? 'bg-white-50 text-black-900'
                : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }`}
        >
            <Recent />
            <Trending />
        </aside>
    );
};
