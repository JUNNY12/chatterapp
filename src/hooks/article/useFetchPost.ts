import { useContext } from 'react';
import { PostContext } from '../../context/article/FetchAllPostContext';
export const useFetchPost = () => {
   const postContext = useContext(PostContext);

   if (!postContext) {
      throw new Error('useFetchPost must be used within a PostProvider');
   }

   const { posts, loading, trendingPosts } = postContext;
   return { posts, loading, trendingPosts };
};
