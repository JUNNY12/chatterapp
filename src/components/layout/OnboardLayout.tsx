import { Outlet } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const OnboardLayout = (): React.JSX.Element => {
    const { theme } = useThemeContext();
    return (
        <>
            <div
                className={` text-center text-5xl text-pink-600 py-2 border-b border-gray-600 font-semibold 
        transition duration-500 ease-in-out
        ${
            theme === 'lightMode'
                ? 'bg-white-50'
                : theme === 'darkMode' && 'bg-gray-800'
        }
        `}
            >
                Chatter
            </div>
            <Outlet />
        </>
    );
};
