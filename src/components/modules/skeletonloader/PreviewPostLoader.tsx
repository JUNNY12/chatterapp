import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export const PreviewPostLoader = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <div
         className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         } `}
      >
         <div>
            <div className="tabletS:flex tabletS:flex-col tabletS:justify-center tabletS:items-center">
               <div>
                  <div className=" bg-gray-300 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] mb-3 h-[300px]"></div>
               </div>
               <div className=" w-[350px] mobileL:w-[280px] mb-3 bg-gray-300 animate-pulse h-8"></div>

               <div className=" w-[350px] mobileL:w-[280px] mb-3 bg-gray-300 animate-pulse h-8"></div>

               <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>

               <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>

               <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>
               <div className="flex flex-wrap items-center my-3">
                  {[...Array(5)].map((_, index) => (
                     <div
                        key={index}
                        className="me-1 w-[70px] mb-3 bg-gray-300 h-8 animate-pulse"
                     ></div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
