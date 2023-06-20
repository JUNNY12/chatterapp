import { Button, Input, Typography } from '../element';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Footer = (): React.JSX.Element => {
   const { theme } = useThemeContext();

   const date = new Date();
   const year = date.getFullYear();
   return (
      <footer
         className={`px-12 tabletM:px-8 tabletS:px-6 py-8 flex justify-center items-center flex-col transition duration-500 ease-in-out
        ${
           theme === 'lightMode'
              ? 'text-black-950 bg-white-100'
              : theme === 'darkMode' && ' text-white-100 bg-gray-900'
        }
        `}
      >
         <div>
            <Typography
               variant={4}
               className="mb-8 mobileXL:mb-4 text-5xl font-bold tabletS:text-3xl mobileXL:text-2xl text-center"
            >
               Subsribe to our newsletter
            </Typography>
            <form action="" className="flex items-center justify-center">
               <Input
                  className=" bg-white-50 w-[300px] mobileXL:w-[280px] mobileL:w-[250px]
                   placeholder:text-black-900 rounded-tl-sm rounded-bl-sm 
                   focus:border-l-[4px] focus:border-pink-600 transition duration-500 ease-in-out"
                  placeholder="Enter your email"
                  type="email"
                  required
               />
               <Button className=" bg-pink-600 p-2  text-white-50 font-semibold rounded-tr-sm rounded-br-sm ">
                  <FiSend className="text-2xl" />
               </Button>
            </form>
         </div>

         <div className="mt-6">
            <Typography
               variant={4}
               className="mb-3 text-2xl font-bold mobileXL:text-xl text-center"
            >
               Follow us
            </Typography>
            <div className="flex justify-center items-center">
               <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="me-6"
               >
                  <FaLinkedin className="text-3xl mobileXL:text-2xl  hover:text-pink-600" />
               </a>
               <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="me-6">
                  <FaTwitter className="text-3xl mobileXL:text-2xl  hover:text-pink-600" />
               </a>
               <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="me-6"
               >
                  <FaFacebook className="text-3xl mobileXL:text-2xl  hover:text-pink-600" />
               </a>
               <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="me-6"
               >
                  <FaInstagram className="text-3xl  hover:text-pink-600" />
               </a>
            </div>
         </div>

         <div className="mt-6 text-xl text-pink-600 font-bold">&copy; Chatter {year}</div>
      </footer>
   );
};
