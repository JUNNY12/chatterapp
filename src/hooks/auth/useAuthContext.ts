import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { AuthContextProps } from '../../context/auth/AuthContext';

export const useAuthContext = (): AuthContextProps => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuthContext must be used within a AuthContextProvider');
   }
   return context;
};
