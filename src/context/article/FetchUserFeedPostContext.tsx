import { createContext, useState, useEffect } from 'react';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { getUser } from '../../firebase/user';

export const FetchUserFeedPostContext = createContext({} as any);

type childrenProps = {
    children: React.ReactNode;
};

export const FetchUserFeedPostContextProvider = ({
    children,
}: childrenProps) => {
    const { user } = useAuthContext();
    const { posts } = useFetchPost();
    const [userFeed, setUserFeed] = useState([] as any);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetail = async () => {
            setLoading(true);
            if (user) {
                const userDetails = await getUser(user?.uid);
                const userTags = userDetails[0]?.data?.tags;
                const updated = posts.filter((post) =>
                    post.tagList?.some((tag: any) => userTags?.includes(tag))
                );
                setUserFeed(updated);
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [user, posts]);

    return (
        <FetchUserFeedPostContext.Provider value={{ userFeed, loading }}>
            {children}
        </FetchUserFeedPostContext.Provider>
    );
};
