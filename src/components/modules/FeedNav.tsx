import { Input, Typography, Button } from '../element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNav } from '../../hooks/nav/useNav';
import { DropNav } from '.';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { useFetchUser } from '../../hooks/user/useFetchUser';

export const FeedNav = (): React.JSX.Element => {
   const { theme, toggleTheme } = useThemeContext();
   const { setShow } = useNav();
   const [showDrop, setShowDrop] = useState(false);
   const { userInfo, loading } = useFetchUser();
   const { user } = useAuthContext();
   const [scrolled, setScrolled] = useState(false);
   const { pathname } = useLocation();

   const dropdownRef = useRef<HTMLDivElement>(null);

   //close dropdown when path changes
   useEffect(() => {
      setShowDrop(false);
   }, [pathname]);

   // Close dropdown when clicked outside
   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest('.toggle-button')
         ) {
            setShowDrop(false);
         }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, []);

   // Track scroll position
   useEffect(() => {
      const handleScroll = () => {
         const offset = window.scrollY;
         if (offset > 70) {
            setScrolled(true);
         } else {
            setScrolled(false);
         }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   //show side bar
   const handleShow = () => {
      setShow((prev) => !prev);
   };

   // show drop nav
   const handleClick = () => {
      setShowDrop((prev) => !prev);
   };

   return (
      <div
         className={`
        ${
           theme === 'lightMode'
              ? `bg-white-50 text-black-950 ${scrolled ? 'shadow-md shadow-black-500' : ''}`
              : theme === 'darkMode' &&
                `bg-gray-800 text-white-100  ${scrolled ? 'shadow-md shadow-gray-900' : ''}`
        }
                fixed w-full items-center flex justify-between z-40 p-6 mobileL:px-2 transition duration-500 ease-in-out`}
      >
         {showDrop && (
            <div ref={dropdownRef} className={`absolute right-2  bg-white-50 z-10 top-24`}>
               <DropNav handleClick={handleClick} />
            </div>
         )}

         <div className=" hidden tabletS:flex">
            <Button onClick={handleShow} title="open" className="text-2xl font-bold toggle-button">
               <AiOutlineMenu />
            </Button>
         </div>
         <Typography variant={1} className="text-3xl mobileXL:text-xl font-bold text-pink-600">
            <Link to={`/`}> Chatter</Link>
         </Typography>

         <div className=" tabletXS:hidden">
            <Input
               placeholder="Search chatter"
               className="bg-white-100 txt-black-950 w-[300px] rounded-sm p-2"
            />
         </div>

         <div className=" flex items-center">
            <div className="me-4">
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
                           className=" relative w-12 h-12 mobileXL:w-8 mobileXL:h-8 cursor-pointer object-cover rounded-full me-3 toggle-button"
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
      </div>
   );
};
