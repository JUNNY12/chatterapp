import { useFetchPost } from './useFetchPost';
import { useState, useEffect } from 'react';

export const useTrendingTags = () => {
   const { posts } = useFetchPost();
   const [trendingTags, setTrendingTags] = useState<{ tagName: string; count: number }[]>([]);

   useEffect(() => {
      const calculateTrendingTags = () => {
         //  Create an object to store the tag name and the number of times it appears in the posts
         let tagCount: { [key: string]: number } = {};
         //  Loop through all the posts
         for (let i = 0; i < posts.length; i++) {
            let tags = posts[i]?.tagList;
            //  Loop through all the tags in the post
            for (let j = 0; j < tags.length; j++) {
               let tag = tags[j];
               tagCount[tag] = (tagCount[tag] || 0) + 1;
            }
         }
         //  Create an array of objects that contain the tag name and the number of times it appears in the posts
         let newTrendingTags = [];
         //  Loop through the tagCount object
         for (let tagName in tagCount) {
            if (tagCount[tagName] >= 2) {
               newTrendingTags.push({ tagName, count: tagCount[tagName] });
            }
         }
         // set the trending tags
         setTrendingTags(newTrendingTags);
      };

      calculateTrendingTags();
   }, [posts]);

   return { trendingTags };
};
