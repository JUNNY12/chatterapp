import { Outlet, useLocation } from 'react-router-dom';
import { SideBar, FeedNav } from '../modules';
import { useNav } from '../../hooks/nav/useNav';
import { useEffect, useRef } from 'react';
import PostProvider from '../../context/article/FetchAllPostContext';
import { ArticleInteractionProvider } from '../../context/article/ArticleInteractionContext';
import { useWidth } from '../../hooks';

export const FeedLayout = (): React.JSX.Element => {
   const { pathname } = useLocation();
   const { show, setShow } = useNav();
   const  width  = useWidth();

   const sideBarRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setShow(false);
   }, [pathname, setShow]);

   useEffect(() => {
      setShow(false);
   },[width, setShow])


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

  
   return (
      <PostProvider>
         <ArticleInteractionProvider>
            <FeedNav />
            <div ref={sideBarRef} className={
               ` block ${!show ? "tabletS:hidden " : ""} transition-all duration-500 ease-in-out
               `
            }>
               <SideBar />
            </div>
            <Outlet />
         </ArticleInteractionProvider>
      </PostProvider>
   );
};
