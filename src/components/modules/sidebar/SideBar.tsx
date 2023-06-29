import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { useLocation } from 'react-router-dom';
import { PostSideBar } from './PostSideBar';
import { SharedSideBar } from './SharedSideBar';

export const SideBar = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   const { pathname } = useLocation();

   return (
      <aside
         className={`h-full fixed z-10 top-0 pt-[6.5rem] left-0 w-[250px] overflow-auto
            border-r border-gray-300 p-8 transition duration-500 ease-in-out 
        ${
           theme === 'lightMode'
              ? 'bg-white-50 text-black-950'
              : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }
        `}
      >
         {pathname.includes('/write' || '/write/edit') ? <PostSideBar /> : <SharedSideBar />}
      </aside>
   );
};
