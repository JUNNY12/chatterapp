import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { MdFeed, MdOutlineFeaturedPlayList, MdExplore } from 'react-icons/md';
import { DiGoogleAnalytics } from 'react-icons/di';
import { NavLink, Link } from 'react-router-dom';
import { Button, Typography } from '../../element';
import { FaPen, FaBookmark } from 'react-icons/fa';

export const SharedSideBar = () => {
   const { user } = useAuthContext();
   const navigate = useNavigate();

   //handle view write
   const handleViewWrite = () => {
      if (user) {
         navigate('/write');
      } else {
         navigate('/onboard');
      }
   };

   return (
      <div className=''>
         <Typography variant={1} className="text-3xl absolute top-4  mobileXL:text-xl font-bold text-pink-600">
            <Link to={`/`}> Chatter</Link>
         </Typography>

         <ul className="font-semibold text-lg">
            <li className="mb-6">
               <Button
                  onClick={handleViewWrite}
                  title="write a post"
                  className="flex items-center font-medium bg-pink-600 text-white-50 p-2 rounded-[40px]"
               >
                  <span className="me-1">Write a post</span>
                  <span>
                     <FaPen className="text-base" />
                  </span>
               </Button>
            </li>
            {user && (
               <NavLink
                  to={`/feed`}
                  className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
                  end
               >
                  <li title="My Feed" className="mb-6 cursor-pointer hover:text-pink-600">
                     <MdFeed className="inline-block me-2" />
                     <span>My Feed</span>
                  </li>
               </NavLink>
            )}

            <NavLink
               to={'/explore'}
               className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
               end
            >
               <li title="Explore" className="mb-6 cursor-pointer hover:text-pink-600">
                  <MdExplore className="inline-block me-2" />
                  <span>Explore</span>
               </li>
            </NavLink>

            {
               user && (
                  <NavLink
                     to={`/bookmarks`}
                     className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
                     end
                  >
                     <li title="bookmarks" className="mb-6 cursor-pointer hover:text-pink-600">
                        <FaBookmark className="inline-block me-2" />
                        <span>Bookmarks</span>
                     </li>
                  </NavLink>
               )
            }

            <NavLink
               to={`/featured`}
               className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
               end
            >
               <li title="Featured Post" className="mb-6 cursor-pointer hover:text-pink-600">
                  <MdOutlineFeaturedPlayList className="inline-block me-2" />
                  <span> Featured Post</span>
               </li>
            </NavLink>
            <NavLink
               to={`/analytics`}
               className={({ isActive }: any) => (isActive ? 'text-pink-600' : '')}
               end
            >
               <li title="Analytics" className="mb-6 cursor-pointer hover:text-pink-600">
                  <DiGoogleAnalytics className="inline-block me-2" />
                  <span>Analytics</span>
               </li>
            </NavLink>
         </ul>
      </div>
   );
};
