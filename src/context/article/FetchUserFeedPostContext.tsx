import { createContext, useState, useEffect } from 'react';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { useNavigate } from 'react-router';

export const FetchUserFeedPostContext = createContext<any>({});

type ChildrenProps = {
   children: React.ReactNode;
};

export const FetchUserFeedPostContextProvider = ({ children }: ChildrenProps) => {
   const { posts } = useFetchPost();
   const { userInfo, loading } = useFetchUser();
   const [userFeed, setUserFeed] = useState<any[]>([]);
   const navigate = useNavigate();

   useEffect(() => {
      if (userInfo) {
         const userTags = userInfo?.tags;
         const updated = posts.filter(
            (post: any) =>
               post.tagList?.some((tag: string) => userTags?.includes(tag)) ||
               post.author?.uid === userInfo?.uid ||
               post.likeCounts?.includes(userInfo?.uid) ||
               post.bookmarks?.includes(userInfo?.uid) ||
               post.comments?.includes(userInfo?.uid)
         );
         setUserFeed(updated);
      }
   }, [userInfo, posts, navigate]);
   // console.log(posts)

   return (
      <FetchUserFeedPostContext.Provider value={{ userFeed, loading }}>
         {children}
      </FetchUserFeedPostContext.Provider>
   );
};
