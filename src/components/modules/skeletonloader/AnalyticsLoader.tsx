import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export const AnalyticsLoader = (): React.JSX.Element => {
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
            <div className="w-[100px] animate-pulse h-8 bg-gray-300 mb-4"></div>
            <div className="w-[200px] mobileL:w-[150px] animate-pulse h-8 bg-gray-300 mb-4"></div>

            <div className="w-[350px] mobileXL:w-[150px] mobileL:w-[150px] animate-pulse h-8 bg-gray-300 mb-4"></div>
            <div className="w-[350px] mobileXL:w-[150px] mobileL:w-[150px] animate-pulse h-8 bg-gray-300 mb-4"></div>
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
