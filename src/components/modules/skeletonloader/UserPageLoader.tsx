import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export const UserPageLoader = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <section
         className={` transition duration-500 mb-4 ease-in-out ${
            theme === 'lightMode' ? ' text-black-950' : theme === 'darkMode' && ''
         } `}
      >
         <div
            className={` h-[150px] animate-pulse bg-gray-300 w-full  relative  rounded-tl-md rounded-tr-md`}
         >
            <div
               className={` animate-pulse bg-gray-600 absolute -bottom-[50px] left-[10px]  w-[100px] h-[100px] object-cover rounded-full transition duration-500 ease-in-out`}
            ></div>
         </div>

         <div className={` animate-pulse  bg-gray-300 h-[100px] mt-16 rounded-md`}></div>

         <div className={` animate-pulse  bg-gray-300 h-[100px] mt-8 rounded-md`}></div>

         <div className={` animate-pulse  bg-gray-300 h-[100px] mt-8 rounded-md`}></div>

         <div className={` animate-pulse  bg-gray-300 h-[100px] mt-8 rounded-md`}></div>
      </section>
   );
};
