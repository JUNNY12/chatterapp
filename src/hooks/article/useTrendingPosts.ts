import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { useFetchPost } from './useFetchPost';
import { useState, useEffect } from 'react';

export const useTrendingPosts = (tag: any) => {
   const { posts } = useFetchPost();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [trendingPosts, setTrendingPosts] = useState<SinglePostInterface[]>([]);

   useEffect(() => {
      setIsLoading(true);
      const formattedTag = tag.replace(/_/g, ' ');
      const filteredPosts = posts.filter((post) => post.tagList.includes(formattedTag));
      setTrendingPosts(filteredPosts);
      setIsLoading(false);
   }, [posts, tag]);

   return { trendingPosts, isLoading };
};
