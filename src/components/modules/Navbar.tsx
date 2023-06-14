import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button } from '../element';
import { FaUserCircle, FaPen, FaMoon, FaSun } from 'react-icons/fa';
import { DropNav } from './dropNav/DropNav';
import { useWidth } from '../../hooks';
import { Link, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetchUser } from '../../hooks/user/useFetchUser';

export const Navbar = (): React.JSX.Element => {
   const [show, setShow] = useState(false);
   const width = useWidth();
   const { theme, toggleTheme } = useThemeContext();
   const { user } = useAuthContext();
   const navigate = useNavigate();
   const { userInfo, loading } = useFetchUser();

   const { pathname } = useLocation();

   useEffect(() => {
      setShow(false);
   }, [user, pathname]);

   //handle view write
   const handleViewWrite = () => {
      if (user) {
         navigate('/write');
      } else {
         navigate('/onboard');
      }
   };

   const dropdownRef = useRef<HTMLDivElement>(null);

   //close menu
   // const handleCloseMenu = () => {
   //     setShow(false);
   // };

   //function to handle dropdown
   const handleClick = () => {
      setShow((prev) => !prev);
   };
   //close dropdown when path changes

   // Close dropdown when clicked outside
   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShow(false);
         }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, []);

   return (
      <header className=" fixed w-full top-0  z-40">
         <div
            className={`absolute right-2 shadow-sm shadow-black-600  bg-white-50 z-10 top-28`}
            ref={dropdownRef}
         >
            {show && <DropNav handleClick={handleClick} />}
         </div>
         <nav
            className={`px-12 tabletM:px-8 tabletS:px-4 py-6 flex justify-between items-center 
            transition duration-500 ease-in-out
            ${
               theme === 'lightMode'
                  ? ' bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            }`}
         >
            <div>
               <Link title="chatter" to={`/`}>
                  <Typography
                     variant={1}
                     className="text-3xl mobileM:text-xl  font-semibold text-pink-600"
                  >
                     Chatter
                  </Typography>
               </Link>
            </div>

            <Link to={`${user ? '/feed' : '/explore'}`}>
               <Typography
                  title="feed"
                  variant={2}
                  className=" text-2xl mobileXL:text-xl mobileM:text-lg font-semibold"
               >
                  {user ? 'Feed' : 'Explore'}
               </Typography>
            </Link>

            <div className="flex items-center">
               {width > 640 && (
                  <div className="me-8">
                     <Button
                        onClick={handleViewWrite}
                        title="write a post"
                        className="flex items-center font-semibold bg-pink-600 text-white-50 p-2 rounded-[40px]"
                     >
                        <span className="me-1">Write a post</span>
                        <span>
                           <FaPen className="text-base" />
                        </span>
                     </Button>
                  </div>
               )}

               <div className="me-8 tabletXS:me-4">
                  <Button
                     onClick={toggleTheme}
                     title="change theme"
                     className="text-2xl mobileL:text-xl"
                  >
                     {theme === 'lightMode' ? <FaMoon /> : <FaSun />}
                  </Button>
               </div>

               <div>
                  {user ? (
                     <div>
                        {loading ? (
                           <div className=" relative w-12  animate-pulse h-12 bg-gray-300 object-cover rounded-full me-3"></div>
                        ) : (
                           <div
                              onClick={handleClick}
                              className=" relative w-12 h-12 mobileXL:w-8 mobileXL:h-8  cursor-pointer object-cover rounded-full me-3"
                           >
                              <img
                                 title="profile picture"
                                 className="rounded-full object-cover w-full h-full"
                                 src={userInfo?.photoUrl}
                                 alt={userInfo?.displayName}
                              />
                           </div>
                        )}
                     </div>
                  ) : (
                     <Button
                        title="profile"
                        className="text-5xl tabletXS:text-3xl"
                        onClick={handleClick}
                     >
                        <FaUserCircle />
                     </Button>
                  )}
               </div>
            </div>
         </nav>
      </header>
   );
};
