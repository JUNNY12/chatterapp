import { PostCard } from '../../components/modules';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { useFetchFeaturedPost } from '../../hooks/article/useFetchFeaturedPost';
import { Typography } from '../../components/element';
import { PostLoader } from '../../components/modules/skeletonloader';

export const FeaturedPosts = (): React.JSX.Element => {
   const { featuredPosts, loading } = useFetchFeaturedPost();

   return (
      <div>
         <Typography
            variant={1}
            className="text-3xl mobileXL:text-xl ms-1 font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
         >
            Featured Posts
         </Typography>

         <div>
            {(loading && featuredPosts.length === 0) || (!loading && featuredPosts.length === 0) ? (
               <div>
                  {[...Array(5)].map((_, index) => (
                     <PostLoader key={index} />
                  ))}
               </div>
            ) : (
               <div>
                  {featuredPosts.map((post: SinglePostInterface) => {
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
      </div>
   );
};
