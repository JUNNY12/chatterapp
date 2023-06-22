import React from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { UnAuthenticatedDropNav } from './UnAuthenticatedDropNav';
import { AuthenticatedDropNav } from './AuthenticatedDropNav';
import { Button } from '../../element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';

interface DropNavProps {
   handleClick: () => void;
}

export const DropNav = ({ handleClick }: DropNavProps): React.JSX.Element => {
   const { user, loading } = useAuthContext();
   const { theme } = useThemeContext();
   return (
      <div
         className={`h-max w-[250px] p-6 rounded-sm relative transition duration-500 ease-in-out drop-shadow-2xl 
        ${
           theme === 'lightMode'
              ? 'text-black-950 bg-white-50'
              : theme === 'darkMode' && 'bg-gray-900 text-white-100'
        }
        `}
      >
         <Button
            title="close"
            onClick={handleClick}
            className="absolute h-6 w-6 bg-pink-600 text-white-50 flex justify-center font-bold items-center top-2 right-2 rounded-sm"
         >
            {' '}
            X{' '}
         </Button>
         {!user && !loading && <UnAuthenticatedDropNav />}
         {user && !loading && <AuthenticatedDropNav />}
      </div>
   );
};
