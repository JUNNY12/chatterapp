import { useState, useEffect } from 'react';
import { useFetchUsers } from './useFetchUsers';
import { getUserArticles } from '../../firebase/article';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';

export const useFetchProfile = (displayName: any) => {
   const { allUsers, loading } = useFetchUsers();
   const [userArticles, setUserArticles] = useState([]) as any;
   const [isLoading, setIsLoading] = useState(false) as any;

   const user = allUsers?.find((user: any) => user?.displayName?.trim() === displayName?.trim());

   let uid = user?.uid;

   const fetchUserArticles = async () => {
      setIsLoading(true);
      if (uid) {
         const userArticles = await getUserArticles(uid);

         const updatedPost = userArticles.map((post: any) => {
            const createdDate = new Date(post?.data?.createdAt);
            const currentDate = new Date();
            const diff = currentDate.getTime() - createdDate.getTime();

            return {
               ...post,
               createdAgo: getTimeDifferenceString(diff),
            };
         });
         setUserArticles(updatedPost);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchUserArticles();
   }, [uid]);

   return {
      user,
      userArticles,
      isLoading,
      loading,
   };
};
