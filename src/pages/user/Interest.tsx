import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';

export const Interest = ({ user }: any) => {
   const { theme } = useThemeContext();
   return (
      <div
         className={` transition duration-500 ease-in-out ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
                        px-4 py-4 my-3 rounded-md`}
      >
         <Typography variant={2} className="my-2 text-xl font-semibold tabletS:text-center">
            Interests
         </Typography>
         <div className=" flex flex-wrap mobileXL:justify-center ">
            {user?.tags.map((tag: string, index: number) => (
               <div
                  key={index}
                  className="me-2 mb-2 rounded-md cursor-pointer bg-pink-600 text-white-50"
               >
                  <Typography variant={2} className="my-2 px-6  text-base">
                     {tag}
                  </Typography>
               </div>
            ))}
         </div>
      </div>
   );
};
