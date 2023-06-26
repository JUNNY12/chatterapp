import { Container, Button, Typography } from '../../components/element';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const FinishTemplate = (): React.JSX.Element => {
   const { theme } = useThemeContext();

   return (
      <Container
         className={` flex justify-center items-center h-screen transition duration-500 ease-in-out
        ${
           theme === 'lightMode'
              ? 'bg-white-50 text-black-950'
              : theme === 'darkMode' && 'bg-gray-800 text-white=50'
        }
        `}
      >
         <div
            className={` h-max flex flex-col justify-center mt-12
            items-center w-max shadow-sm shadow-black-900 rounded-md
            p-6 mobileL:p-4 mb-12
            transition duration-500 ease-in-out
            ${
               theme === 'lightMode'
                  ? 'bg-white-100'
                  : theme === 'darkMode' && 'bg-gray-900 text-white-50'
            }
            `}
         >
            <div className=" bg-white-50 p-2 mb-3 h-20 w-20 rounded-full flex items-center justify-center ">
               <FaCheck className="text-6xl text-green-600" />
            </div>
            <Typography variant={2} className=" text-3xl text-center font-bold mobileL:text-xl">
               Voila !!! Your Account is all setup
            </Typography>
            <p className=" text-lg mobileL:text-lg my-3 italic mb-3">Happy writing and Reading</p>

            <div className="mb-4">
               <Typography
                  variant={4}
                  className=" text-2xl mobileL:text-lg font-semibold text-center"
               >
                  What's Next!! Go to
               </Typography>
            </div>

            <div className=" flex  flex-col ">
               <Link to={`/feed`}>
                  <Button
                     className=" bg-pink-600 text-white-50 p-2 mb-3
                     rounded-[40px] font-semibold w-[200px] text-center"
                  >
                     {' '}
                     Blog Feed
                  </Button>
               </Link>
               <div className="mb-4 text-center">
                  <Typography variant={4} className=" text-2xl text-center font-semibold">
                     or
                  </Typography>
               </div>
               <Link to={`/settings`}>
                  <Button
                     className=" bg-pink-600 text-white-50 p-2 
                     rounded-[40px] font-semibold w-[200px] text-center"
                  >
                     {' '}
                     Your Profile Settings
                  </Button>
               </Link>
            </div>
         </div>
      </Container>
   );
};
