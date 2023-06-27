import { useState } from 'react';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Button, Typography } from '../../components/element';

export const Interest = ({ user }: any) => {
   const { theme } = useThemeContext();
   const [expanded, setExpanded] = useState(false);

   const toggleExpand = () => {
      setExpanded(!expanded);
   };

   return (
      <div
         className={`transition duration-500 ease-in-out relative ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
         px-4 py-4 my-3  rounded-md`}
      >
         <Typography variant={2} className="my-2 text-xl font-semibold tabletS:text-center">
            Interests
         </Typography>
         <div className="flex flex-wrap mobileXL:justify-center mb-6">
            {(expanded ? user?.tags : user?.tags.slice(0, 5))?.map((tag: string, index: number) => (
               <div
                  key={index}
                  className="me-2 mb-3 rounded-md cursor-pointer bg-pink-600 text-white-50"
               >
                  <Typography
                     variant={2}
                     className="py-1 px-2 mobileXL:text-[0.7rem] mobileXL:font-semibold text-base"
                  >
                     {tag}
                  </Typography>
               </div>
            ))}
         </div>
         <div className=" absolute bottom-1 left-4">
            {!expanded && user?.tags?.length > 5 && (
               <Button
                  className="text-center bg-gray-300 p-1 rounded-md cursor-pointer mt-2"
                  onClick={toggleExpand}
               >
                  Show All
               </Button>
            )}
            {expanded && (
               <Button
                  className="text-center bg-gray-300 p-1 rounded-md cursor-pointer"
                  onClick={toggleExpand}
               >
                  Show Less
               </Button>
            )}
         </div>
      </div>
   );
};
