import { Typography } from '../../components/element';
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
   LinkedinShareButton,
   LinkedinIcon,
} from 'react-share';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';

interface AuthorProfileProps {
   author: any;
   handleNavigate: () => void;
   singlePost: SinglePostInterface;
}

export const AuthorProfile = ({
   author,
   handleNavigate,
   singlePost,
}: AuthorProfileProps): React.JSX.Element => {
   const shareURL = window.location.href;

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
                  <FacebookShareButton
                     title={singlePost?.title}
                     quote={singlePost?.subtitle}
                     url={shareURL}
                     className="me-2"
                  >
                     <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>

                  <TwitterShareButton
                     title={singlePost?.title}
                     hashtags={singlePost?.tagList}
                     url={shareURL}
                     className="me-2"
                  >
                     <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>

                  <LinkedinShareButton
                     title={singlePost?.title}
                     summary={singlePost?.subtitle}
                     url={shareURL}
                     className="me-2"
                  >
                     <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
               </div>
            </div>
         </div>
      </aside>
   );
};
