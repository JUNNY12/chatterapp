import { useContext } from 'react';
import { FetchUserFeedPostContext } from '../../context/article/FetchUserFeedPostContext';

export const useFetchFeed = () => {
   const context = useContext(FetchUserFeedPostContext);
   if (context === undefined) {
      throw new Error('useFetchFeed must be used within a FetchUserFeedPostContext');
   }

   return context;
};
