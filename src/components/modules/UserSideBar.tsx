import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../element';
import { NavLink, useLocation } from 'react-router-dom';

export const UserSideBar = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   const { pathname } = useLocation();

   let formattedPathname = pathname.replace(/\/([^/]+)/g, ' / $1');

   if (pathname.includes('/preview')) {
      formattedPathname = pathname.replace(/\/preview(\/*[^/]*)/, ' / preview');
   }

   return (
      <div className="mx-8  tabletXS:mx-4">
         <div
            className={` transition duration-500 ease-in-out w-full rounded-md border border-gray-300 mb-4 ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
         >
            <Typography
               variant={1}
               className="font-bold text-xl tabletS:text-lg tabletS:font-bold mobileXL:text-lg p-4"
            >
               User {formattedPathname}
            </Typography>
         </div>

         <div
            className={` transition duration-500 w-full mb-4 rounded-md border border-gray-300 ease-in-out ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
         >
            <ul className=" p-4 ">
               <NavLink
                  to={`/settings`}
                  className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
                  end
               >
                  <li className="text-xl tabletS:text-lg font-bold  mb-4">Profile</li>
               </NavLink>
               <NavLink
                  to={`/settings/post`}
                  className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
                  end
               >
                  <li className="text-xl tabletS:text-lg font-bold mb-4">Manage Post</li>
               </NavLink>
               <NavLink
                  to={`/settings/account`}
                  className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
                  end
               >
                  <li className="text-xl tabletS:text-lg font-bold mb-4">Account</li>
               </NavLink>
            </ul>
         </div>
      </div>
   );
};
