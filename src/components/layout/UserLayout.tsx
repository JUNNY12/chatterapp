import { Outlet } from 'react-router';
import { Navbar, UserSideBar } from '../modules';

export const UserLayout = (): React.JSX.Element => {
   return (
      <>
         <Navbar />

         <div className=" flex  bg-white-100 pt-36 tabletXS:pt-28 tabletL:flex-col">
            <div className="w-1/4 tabletL:w-full">
               <UserSideBar />
            </div>

            <div className="w-3/4 tabletL:w-full">
               <Outlet />
            </div>
         </div>
      </>
   );
};
