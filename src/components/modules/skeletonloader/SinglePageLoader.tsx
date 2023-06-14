import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export const SinglePageLoader = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <section className={` bg-white-100 h-max`}>
         <div className={` ms-[250px] tabletS:ms-0 pt-24   `}>
            <div
               className={` border border-gray-300 flex laptopS:flex-col justify-between rounded-sm m-8 mb-8 tabletXS:m-3 tabletXS:mb-8 h-full transition duration-500 ease-in-out p-8 mobileXL:px-2 
                        ${
                           theme === 'lightMode'
                              ? 'bg-white-50 text-black-950'
                              : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                        }
                        `}
            >
               <div className="tabletS:flex tabletS:flex-col tabletS:justify-center tabletS:items-center">
                  <div>
                     <div className=" bg-gray-300 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] mb-3 h-[300px]"></div>
                  </div>
                  <div className=" w-[350px] mobileL:w-[280px] mb-3 bg-gray-300 animate-pulse h-8"></div>

                  <div className=" w-[350px] mobileL:w-[280px] mb-3 bg-gray-300 animate-pulse h-8"></div>

                  <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>

                  <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>

                  <div className=" bg-gray-300 mb-3 animate-pulse max-w-[600px] tabletS:w-[350px] mobileL:w-[280px] h-[50px]"></div>
               </div>
               <aside
                  className=" border border-gray-300 w-[250px] laptopS:w-full laptopS:mt-8 
                    h-max rounded-sm flex flex-col items-center justify-center"
               >
                  <div className=" w-[150px] animate-pulse h-8"></div>

                  <div className=" flex items-center justify-center p-4 flex-col">
                     <div className=" w-[100px]  h-[100px] mobileXL:w-[50px] mb-3 mobileXL:h-[50px] me-4 bg-gray-300  rounded-full"></div>
                     <div className="w-[200px] bg-gray-300 h-8 animate-pulse mb-3"></div>
                  </div>

                  <div className="w-[200px] bg-gray-300 mb-3 animate-pulse h-8"></div>
                  <div className="w-[200px] bg-gray-300 mb-3 animate-pulse h-8"></div>

                  <div>
                     <p className=" w-[200px] bg-gray-300  mb-3 h-8 animate-pulse"></p>
                  </div>

                  <div className=" flex flex-wrap items-center justify-center">
                     {[...Array(4)].map((_, index) => (
                        <div
                           key={index}
                           className="me-1 w-[40px] h-[40px] mb-3 bg-gray-300 rounded-full animate-pulse"
                        ></div>
                     ))}
                  </div>
               </aside>
            </div>
         </div>
      </section>
   );
};
