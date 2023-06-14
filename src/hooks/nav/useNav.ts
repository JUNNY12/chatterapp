import { NavContext } from '../../context/nav/NavContext';
import { useContext } from 'react';

export const useNav = () => {
   const context = useContext(NavContext);
   if (context === undefined) {
      throw new Error('useNav must be used within a NavContextProvider');
   }
   return context;
};
