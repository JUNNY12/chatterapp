import { Outlet, useLocation } from 'react-router-dom';
import { SideBar, FeedNav } from '../modules';
import { useNav } from '../../hooks/nav/useNav';
import { useEffect, useRef } from 'react';
import { useWidth } from '../../hooks';
import { useSearch } from '../../hooks/search/useSearch';
import { SearchContainer } from '../SearchContainer';

export const FeedLayout = (): React.JSX.Element => {
   const { pathname } = useLocation();
   const { show, setShow } = useNav();
   const width = useWidth();
   const {
      state: { searchTerm },
      setSearchTerm,
   } = useSearch();

   const sideBarRef = useRef<HTMLDivElement>(null);
   const searchRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      setShow(false);
   }, [pathname, setShow]);

   useEffect(() => {
      setShow(false);
   }, [width, setShow]);

   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (
            sideBarRef.current &&
            !sideBarRef.current.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest('.toggle-button')
         ) {
            setShow(false);
         }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, []);

   useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
         if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSearchTerm('');
         }
      };

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, [setSearchTerm]);

   return (
      <>
         <FeedNav />
         <div
            ref={sideBarRef}
            className={` block ${
               !show ? 'tabletS:hidden ' : ''
            } transition-all duration-500 ease-in-out
               `}
         >
            <SideBar />
         </div>
         <div>
            <div ref={searchRef}>{searchTerm && <SearchContainer />}</div>
            <Outlet />
         </div>
      </>
   );
};
