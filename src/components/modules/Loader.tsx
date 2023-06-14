import { PuffLoader } from 'react-spinners';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Loader = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <div
         className={` flex justify-center items-center h-screen 
        ${theme === 'lightMode' ? 'bg-white-50' : theme === 'darkMode' && 'bg-gray-800'}
        `}
      >
         <PuffLoader color={` #ba40aa`} size={100} />
      </div>
   );
};
