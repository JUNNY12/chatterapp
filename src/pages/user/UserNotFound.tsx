import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Link } from 'react-router-dom';
import { Button } from '../../components/element';

export const UserNotFound = (): React.JSX.Element => {
   const { theme } = useThemeContext();
   return (
      <div className="flex items-center  justify-center h-[85vh]">
         <div
            className={` h-[400px] flex flex-col items-center p-4 text-xl text-center rounded-md justify-center  max-w-[400px] transition duration-500 mb-4 ease-in-out 
                ${
                   theme === 'lightMode'
                      ? ' text-black-950 bg-white-50 shadow-lg shadow-gray-400'
                      : theme === 'darkMode' &&
                        'shadow-lg shadow-white-600 text-white-100 bg-gradient-to-bl from-gray-500 to-gray-800'
                } `}
         >
            <p>
               <span className="text-3xl animate-bounce font-bold inline-block">Opps!!!</span>{' '}
               <br /> <br />
               <span> It appears that the user you are looking for does not exist.</span>
            </p>

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
};
