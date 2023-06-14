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
         const updated = posts.filter((post) =>
            post.tagList?.some((tag: string) => userTags?.includes(tag))
         );
         setUserFeed(updated);
      }
   }, [userInfo, posts, navigate]);

   return (
      <FetchUserFeedPostContext.Provider value={{ userFeed, loading }}>
         {children}
      </FetchUserFeedPostContext.Provider>
   );
};
