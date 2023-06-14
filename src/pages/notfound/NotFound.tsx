import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Button, Typography } from '../../components/element';
import { Link } from 'react-router-dom';

export default function NotFound(): React.JSX.Element {
   const { theme } = useThemeContext();

   return (
      <div
         className={`transition h-screen duration-500 ease-in-out flex items-center justify-center pt-36 ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }`}
      >
         <div className="object-contain h-[400px] w-[400px] mobileL:w-full relative">
            <img src="/images/404.svg" alt="" />
            <div>
               <Typography variant={1} className="text-2xl font-semibold text-center">
                  Page Not Found
               </Typography>
            </div>

            <div className=" flex justify-center items-center mt-8">
               <Link to={`/`}>
                  <Button className=" p-2 bg-pink-600 rounded-[40px] text-white-50 w-[150px]">
                     Back Home
                  </Button>
               </Link>
            </div>
         </div>
      </div>
   );
}
