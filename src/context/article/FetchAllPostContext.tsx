import { createContext } from 'react';
import { getAllArticle } from '../../firebase/article';
import { useEffect, useState } from 'react';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { getTopArticle } from '../../firebase/article';
import { getUser } from '../../firebase/user';

export interface Author {
    id: string;
    data: {
        socialInfo: {
            twitter: string;
            website: string;
            instagram: string;
            facebook: string;
            linkedIn: string;
            github: string;
        };
        uid: string;
        bio: string;
        status: string;
        tags: string[];
        displayName: string;
        location: string;
        availability: string;
        photoUrl: string;
        fullName: string;
        email: string;
        userType: {
            isWriter: boolean;
            isReader: boolean;
        };
        occupation: string;
    }[];
}

export interface Comment {
    id: string;
    text: string;
    author: {
        authorId: string;
        fullName: string;
        photoUrl: string;
    };
    createdAt: string;
    replies: Comment[];
}

export interface SinglePostInterface {
    id: string;
    title: string;
    body: string;
    subtitle: string;
    coverImage: string;
    tagList: string[];
    author: Author;
    createdAgo: string;
    updatedAt: string;
    slug: string;
    likeCount: number;
    commentCount: number;
    views: number;
    comments: Comment[];
}

export interface PostInterface {
    posts: SinglePostInterface[];
    trendingPosts: SinglePostInterface[];
    loading: boolean;
}

export const PostContext = createContext<PostInterface | null>(null);

type ProviderChildren = {
    children: React.ReactNode;
};

export default function PostProvider({ children }: ProviderChildren) {
    const [posts, setPosts] = useState<SinglePostInterface[]>([]);
    const [trendingPosts, setTrendingPosts] = useState<SinglePostInterface[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { articles } = await getAllArticle();
            // console.log('articles', articles);

            // Sort articles in descending order based on creation time
            const sortedArticles = articles.sort((a: any, b: any) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return dateB.getTime() - dateA.getTime();
            });

            // Fetch author details for each article by authorId
            const updatedPosts = await Promise.all(
                sortedArticles.map(async (post: any) => {
                    const createdDate = new Date(post.createdAt);
                    const currentDate = new Date();
                    const timeDifference =
                        currentDate.getTime() - createdDate.getTime();

                    // console.log(post.author.authorId)

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

            setPosts(updatedPosts);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const fetchTopPosts = async () => {
        setLoading(true);
        const { articles } = await getTopArticle();

        // Sort articles in descending order based on creation time
        const sortedArticles = articles.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
        });

        const updatedPost = sortedArticles.map((post: any) => {
            const createdDate = new Date(post.createdAt);
            const currentDate = new Date();
            const timeDifference =
                currentDate.getTime() - createdDate.getTime();

            // Update the post object with the relative time
            return {
                ...post,
                createdAgo: getTimeDifferenceString(timeDifference),
            };
        });

        setTrendingPosts(updatedPost);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
        fetchTopPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, loading, trendingPosts }}>
            {children}
        </PostContext.Provider>
    );
}
