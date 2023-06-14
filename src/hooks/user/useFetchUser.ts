import { useContext } from 'react';
import { UserContext } from '../../context/users/GetUserContext';

export const useFetchUser = () => {
   const context = useContext(UserContext);
   if (context === undefined) {
      throw new Error('useFetchUser must be used within a UserProvider');
   }
   return context;
};
