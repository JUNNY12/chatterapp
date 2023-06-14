import { Outlet, Link } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const OnboardLayout = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <>
         <div
            className={` text-center text-5xl mobileXL:text-3xl fixed w-full  text-pink-600 py-2 border-b border-gray-600 font-semibold 
        transition duration-500 ease-in-out
        ${theme === 'lightMode' ? 'bg-white-50' : theme === 'darkMode' && 'bg-gray-800'}
        `}
         >
            <Link to={`/`}>Chatter</Link>
         </div>
         <div className="pt-12">
            <Outlet />
         </div>
      </>
   );
};
