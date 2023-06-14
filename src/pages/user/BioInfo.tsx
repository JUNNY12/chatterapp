import { Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const BioInfo = ({ user }: any) => {
   const { theme } = useThemeContext();
   return (
      <div
         className={` transition duration-500 ease-in-out ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
                          pt-16 px-4 py-3 rounded-bl-md rounded-br-md`}
      >
         <div>
            <Typography variant={1} className=" text-2xl font-bold">
               {user?.fullName}
            </Typography>

            <Typography variant={2} className="my-2 text-base">
               {user?.location}
            </Typography>

            <Typography variant={2} className="my-2 font-bold me-4 text-base">
               @ {user?.displayName}
            </Typography>

            <Typography variant={2} className="my-2 text-base">
               {user?.occupation}
            </Typography>

            <div className="my-3">
               <p>{user?.bio}</p>
            </div>
         </div>
      </div>
   );
};
