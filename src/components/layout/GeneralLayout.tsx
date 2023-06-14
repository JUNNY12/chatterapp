import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../modules';

export const GeneralLayout = (): React.JSX.Element => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};
