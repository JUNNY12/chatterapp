import { FaTwitter, FaFacebook, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const SocialLink = ({ user }: any) => {
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
            Social Links
         </Typography>
         <div className=" flex items-center justify-center text-3xl mobileL:text-2xl">
            {user?.socialInfo?.twitter && (
               <a href={user?.socialInfo?.twitter} target="_blank" title="twitter">
                  <FaTwitter className=" me-4 cursor-pointer" />
               </a>
            )}

            {user?.socialInfo?.facebook && (
               <a href={user?.socialInfo?.facebook} target="_blank" title="facebook">
                  <FaFacebook className=" me-4 cursor-pointer" />
               </a>
            )}
            {user?.socialInfo?.linkedIn && (
               <a href={user?.socialInfo?.linkedIn} target="_blank" title="linkedIn">
                  <FaLinkedinIn className=" me-4 cursor-pointer" />
               </a>
            )}
            {user?.socialInfo?.github && (
               <a href={user?.socialInfo?.github} title="github" target="_blank">
                  <FaGithub className=" me-4 cursor-pointer" />
               </a>
            )}

            {user?.socialInfo?.instagram && (
               <a href={user?.socialInfo?.instagram} title="instagram" target="_blank">
                  <FaInstagram className=" me-4 cursor-pointer" />
               </a>
            )}
            {user?.socialInfo?.website && (
               <a href={user?.socialInfo?.website} title="website" target="_blank">
                  <TbWorldWww className=" me-4 cursor-pointer" />
               </a>
            )}
         </div>
      </div>
   );
};
