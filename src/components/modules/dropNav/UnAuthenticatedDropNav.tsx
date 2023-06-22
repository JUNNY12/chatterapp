import { Link } from 'react-router-dom';
import { Button } from '../../element';
import { FaUserCircle } from 'react-icons/fa';

export const UnAuthenticatedDropNav = (): React.JSX.Element => {
   return (
      <div className="flex justify-center items-center flex-col rounded-sm">
         <FaUserCircle className="text-7xl " />

         <div className=" text-2xl font-semibold my-3">
            Sign Up or Login to your Chatter Account
         </div>

         <div className="my-3 text-lg ">Take Less than a few seconds</div>

         <div className="mb-4 flex items-center">
            <Link to={`/onboard`}>
               <Button
                  title="Sign up"
                  className=" bg-pink-600 text-white-50 font-semibold me-2 w-[100px] rounded-[40px] p-2"
               >
                  Sign up
               </Button>
            </Link>
            <Link to={`/onboard`}>
               <Button
                  title="Log in"
                  className=" bg-white-50 font-semibold text-pink-600 border w-[100px] border-pink-600 rounded-[40px] p-2"
               >
                  Log in
               </Button>
            </Link>
         </div>
      </div>
   );
};
