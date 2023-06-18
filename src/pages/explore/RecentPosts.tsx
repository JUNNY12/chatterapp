import { Typography } from '../../components/element';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { PostCard } from '../../components/modules';
import { PostLoader } from '../../components/modules/skeletonloader';

export const RecentPosts = (): React.JSX.Element => {
   const { loading, posts } = useFetchPost();

   return (
      <section>
         <Typography
            variant={1}
            className="text-3xl mobileXL:text-xl ms-1 font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
         >
            Recent
         </Typography>
         <div>
            {(loading && posts.length === 0) || (!loading && posts.length === 0) ? (
               [...Array(6)].map((_, index) => <PostLoader key={index} />)
            ) : (
               <div>
                  {posts.slice(0, 6).map((post: any) => {
                     const { id } = post;
                     return <PostCard key={id} post={post} />;
                  })}
               </div>
            )}
         </div>
      </section>
   );
};
