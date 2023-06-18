import { RecentPosts } from '.';
import { PostCard } from '../../components/modules';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { PostLoader } from '../../components/modules/skeletonloader';
import { Typography } from '../../components/element';

export const ExplorePosts = (): React.JSX.Element => {
   const { posts, loading } = useFetchPost();

   return (
      <div>
         {/* <Trending /> */}
         <RecentPosts />

         <div>
            {(loading && posts.length === 0) || (!loading && posts.length === 0) ? (
               [...Array(10)].map((_, index) => <PostLoader key={index} />)
            ) : (
               <div>
                  {' '}
                  <Typography
                     variant={1}
                     className="text-3xl mobileXL:text-xl ms-1 font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
                  >
                     Explore
                  </Typography>
                  {posts.map((post: any) => {
                     const { id } = post;
                     return <PostCard key={id} post={post} />;
                  })}
               </div>
            )}
         </div>
      </div>
   );
};
