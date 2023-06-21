import { useState, useEffect } from 'react';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { getAllArticle } from '../../firebase/article';
import { getUser } from '../../firebase/user';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { Author } from '../../context/article/FetchAllPostContext';
import { useLocation } from 'react-router';
import { useFetchUser } from '../user/useFetchUser';

export const useFetchbookmarkPosts = () => {
   const [bookmarkedPosts, setbookmarkedPosts] = useState<SinglePostInterface[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const location = useLocation();
   const { userInfo } = useFetchUser();

   // console.log(bookmarkedPosts);

   const fetchbookmarkedPost = async () => {
      setLoading(true);

      try {
         const { articles } = await getAllArticle();
         let posts;
         const bookmarkedPost: any = articles.filter((article: SinglePostInterface | any) =>
            article?.bookmarks?.includes(userInfo?.uid)
         );
         posts = bookmarkedPost;

         // Sort articles in descending order based on creation time
         const sortedPosts = posts.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
         });

         // Fetch author details for each article by authorId
         const updatedPosts = await Promise.all(
            sortedPosts.map(async (post: any) => {
               const createdDate = new Date(post.createdAt);
               const currentDate = new Date();
               const timeDifference = currentDate.getTime() - createdDate.getTime();

               // Fetch author details using authorId
               const author = await getUser(post.author.authorId);

               // Update the post object with the relative time and author details
               return {
                  ...post,
                  createdAgo: getTimeDifferenceString(timeDifference),
                  author: author as Author,
               };
            })
         );

         setbookmarkedPosts(updatedPosts);
         setLoading(false);
      } catch (error) {
         console.log('Error fetching posts:', error);
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchbookmarkedPost();
   }, [location, userInfo?.uid]);

   return { bookmarkedPosts, loading };
};
