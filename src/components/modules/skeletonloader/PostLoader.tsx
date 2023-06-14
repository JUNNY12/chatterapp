import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export const PostLoader = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <div
         className={`rounded-md m-8 p-8  tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
      >
         <div className=" flex items-center mb-3">
            <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 bg-gray-300 animate-pulse relative rounded-full object-cover"></div>
            <div>
               <div className="w-[350px] mobileXL:w-[200px] mobileL:w-[150px] animate-pulse h-8 bg-gray-300 mb-4"></div>
               <div className="inline-flex flex-wrap">
                  <span className="inline-block w-[100px] mobileXL:w-[70px] bg-gray-300 h-8 animate-pulse"></span>
                  <span className=" ms-6 mobileXL:ms-3 inline-block w-[100px] mobileXL:w-[70px] animate-pulse bg-gray-300 h-8"></span>
               </div>
            </div>
         </div>

         <div>
            <div className=" max-w-[600px] tabletS:w-[400px] mobileXL:w-[300px] mobileL:w-[250px] bg-gray-300 animate-pulse h-8 mb-2"></div>
            <div className=" max-w-[600px] tabletS:w-[400px] mobileXL:w-[300px] mobileL:w-[250px] bg-gray-300 animate-pulse h-8 mb-2"></div>

            <div className="flex flex-wrap items-center my-3">
               {[...Array(5)].map((_, index) => (
                  <div
                     key={index}
                     className="me-1 w-[70px] mb-3 bg-gray-300 h-8 animate-pulse"
                  ></div>
               ))}
            </div>
         </div>

         <div className=" max-w-[600px] tabletS:w-[400px] mobileXL:w-[300px] mobileL:w-[250px] h-[250px] bg-gray-300 animate-pulse mb-2"></div>
      </div>
   );
};
