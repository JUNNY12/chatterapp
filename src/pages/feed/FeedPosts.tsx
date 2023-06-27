import { PostLoader } from '../../components/modules/skeletonloader';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { useFetchFeed } from '../../hooks/article/useFetchFeed';
import { PostCard } from '../../components/modules';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography} from '../../components/element';
import { Link } from 'react-router-dom';

export const FeedPosts = (): React.JSX.Element => {
   const { loading , userFeed} = useFetchFeed();
   const { theme } = useThemeContext();

   //if userFeed is empty
   if (!loading && userFeed?.length === 0)
      return (
         <div className="flex flex-col items-center justify-center h-[50vh] mx-3">
            <div
               className={` drop-shadow-xl p-2 flex flex-col items-center justify-center max-w-[800px] h-[200px] rounded-md
                ${theme === 'lightMode'
                     ? 'bg-white-50 text-black-950'
                     : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                  }
                `}
            >
               <Typography
                  variant={1}
                  className="text-2xl text-center mobileXL:text-xl mobileL:text-base ms-1 font-semibold mb-3 px-8 pt-8 mobileXL:px-2 "
               >
                  No Posts matching your interests. Go to <Link className="text-pink-600 hover:underline" to={`/settings`}> Settings </Link>
                   and add some interests or 
                  <Link to="/explore" className="text-pink-600 hover:underline"> Explore posts</Link>
               </Typography>
              
            </div>
         </div>
      );

   return (
      <div>
         {(loading && userFeed.length === 0) || (!loading && userFeed.length === 0) ? (
            <div>
               {[...Array(5)].map((_, index) => (
                  <PostLoader key={index} />
               ))}
            </div>
         ) : (
            <div>
               {userFeed.map((post: SinglePostInterface) => {
                  const { id } = post;
                  return (
                     <div key={id}>
                        <PostCard key={id} post={post} />
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
};
