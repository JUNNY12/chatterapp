import { PostCard } from '../../components/modules';
import { useFetchbookmarkPosts } from '../../hooks/article/useFetchbookmarkPosts';
import { PostLoader } from '../../components/modules/skeletonloader';
import { Button, Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useNavigate } from 'react-router';

export const BookmarkPosts = (): React.JSX.Element => {
   const { loading, bookmarkedPosts } = useFetchbookmarkPosts();
   const { theme } = useThemeContext();
   const navigate = useNavigate();

   //if bookmarkedPosts is empty array
   if (!loading && bookmarkedPosts.length === 0)
      return (
         <div className="flex flex-col items-center mx-3 justify-center h-[50vh]">
            <div
               className={` p-2 flex flex-col drop-shadow-xl  items-center justify-center max-w-[800px] h-[200px] rounded-md
               ${
                  theme === 'lightMode'
                     ? 'bg-white-50 text-black-950'
                     : theme === 'darkMode' && 'bg-gray-800 text-white-100'
               }
               `}
            >
               <Typography
                  variant={1}
                  className="text-2xl mobileXL:text-xl ms-1 font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
               >
                  No bookmarked posts
               </Typography>
               <Button
                  className={`bg-pink-600 text-white-100 font-bold text-xl px-8 py-2 rounded-md
                        ${
                           theme === 'lightMode'
                              ? 'hover:bg-pink-700'
                              : theme === 'darkMode' && 'hover:bg-pink-500'
                        }
                        `}
                  onClick={() => navigate('/explore')}
               >
                  Explore posts
               </Button>
            </div>
         </div>
      );

   return (
      <div>
         <div>
            {loading && bookmarkedPosts.length === 0 ? (
               [...Array(10)].map((_, index) => <PostLoader key={index} />)
            ) : (
               <div>
                  {' '}
                  <Typography
                     variant={1}
                     className="text-3xl mobileXL:text-xl ms-1 font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
                  >
                     Bookmark Posts
                  </Typography>
                  {bookmarkedPosts.map((post: any) => {
                     const { id } = post;
                     return <PostCard key={id} post={post} />;
                  })}
               </div>
            )}
         </div>
      </div>
   );
};
