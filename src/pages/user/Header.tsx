import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Header = ({ user, isLoading }: any) => {
   const { theme } = useThemeContext();
   return (
      <div
         className={` h-[150px] w-full transition duration-500 ease-in-out relative
                        ${
                           theme === 'lightMode'
                              ? 'bg-gradient-to-tr from-pink-100 to-pink-600'
                              : theme === 'darkMode' &&
                                ' bg-gradient-to-tr from-white-100 to-gray-800'
                        } rounded-tl-md rounded-tr-md`}
      >
         <div
            className={`
                    ${isLoading && 'animate-pulse'}
                    ${theme === 'lightMode' ? 'bg-white-50' : theme === 'darkMode' && 'bg-pink-600'}
                    absolute p-1 -bottom-[50px] left-[10px] w-[100px] h-[100px] object-cover rounded-full
                    transition duration-500 ease-in-out
                    `}
         >
            <img src={user?.photoUrl} className="rounded-full w-full h-full object-cover" alt="" />
         </div>
      </div>
   );
};
