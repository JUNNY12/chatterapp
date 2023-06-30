import { useTrendingPosts } from '../../hooks/article/useTrendingPosts';
import { PostLoader } from '../../components/modules/skeletonloader';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { PostCard } from '../../components/modules';

interface TrendingProps {
   tag: any;
}
export const TrendingPosts = ({ tag }: TrendingProps) => {
   const { trendingPosts, isLoading } = useTrendingPosts(tag);
   console.log(trendingPosts);
   return (
      <div>
         {isLoading || trendingPosts?.length === 0 ? (
            <div>
               {[...Array(5)].map((_, index) => (
                  <PostLoader key={index} />
               ))}
            </div>
         ) : (
            <div>
               {trendingPosts.map((post: SinglePostInterface) => {
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
