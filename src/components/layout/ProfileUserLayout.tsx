import { Navbar } from '../modules';
import { Outlet } from 'react-router';
import { UsersProvider } from '../../context/users/FetchAllUserContext';

export const ProfileUserLayout = (): React.JSX.Element => {
   return (
      <UsersProvider>
         <Navbar />
         <div className="pt-[7rem] mx-8 tabletS:mx-4">
            <Outlet />
         </div>
      </UsersProvider>
   );
};
