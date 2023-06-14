import { Typography } from '../../components/element';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface AuthorProfileProps {
   author: any;
   handleNavigate: () => void;
}

export const AuthorProfile = ({
   author,
   handleNavigate,
}: AuthorProfileProps): React.JSX.Element => {
   return (
      <aside
         className=" border border-gray-300 w-[250px] laptopS:w-full laptopS:mt-8 
                    h-max rounded-sm"
      >
         <div>
            <Typography
               variant={1}
               className="p-4 bg-gray-100 text-center font-semibold text-3xl mb-3 text-pink-600"
            >
               Author
            </Typography>
         </div>

         <div
            onClick={handleNavigate}
            className=" flex items-center justify-center p-4 flex-wrap cursor-pointer"
         >
            <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4  relative rounded-full object-cover">
               <img
                  src={author?.photoUrl}
                  alt={author?.fullName}
                  title={author?.displayName}
                  className=" rounded-full object-cover w-full h-full"
               />
            </div>
            <div>
               <Typography variant={1} className="font-bold text-xl mobileXL:text-lg text-center">
                  {author?.fullName}
               </Typography>
            </div>
         </div>

         <div>
            <Typography variant={2} className="text-center text-xl font-bold">
               {author?.occupation}
            </Typography>
         </div>

         <div>
            <p className="p-2 text-center">{author?.bio}</p>
         </div>

         <div>
            <Typography
               variant={1}
               className="p-4 text-center font-semibold text-xl mb-3 text-pink-600"
            >
               Share Article
            </Typography>

            <div className=" mb-4">
               <div className="flex justify-center items-center">
                  <FaFacebook className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
                  <FaTwitter className="text-3xl me-4 cursor-pointer hover:text-pink-600 " />
                  <FaLinkedin className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
                  <FaInstagram className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
               </div>
            </div>
         </div>
      </aside>
   );
};
