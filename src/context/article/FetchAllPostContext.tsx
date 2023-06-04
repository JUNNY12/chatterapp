import { createContext } from "react";
import { getAllArticle } from "../../firebase/article";
import { useEffect, useState } from "react";
import { getTimeDifferenceString } from "../../utils/getTimeDifference";
import { getTopArticle } from "../../firebase/article";


export interface Author {
    authorId: string;
    displayName: string;
    fullName: string;
    bio: string;
    photoUrl: string;
    occupation: string;
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

export interface Post {
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
    posts: Post[];
    trendingPosts: Post[];
    loading: boolean;
}

export const PostContext = createContext<PostInterface | null>(null);

type ProviderChildren = {
    children: React.ReactNode;
};

export default function PostProvider({ children }: ProviderChildren) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosts = async () => {
        setLoading(true);
        const { articles } = await getAllArticle();

        // Sort articles in descending order based on creation time
        const sortedArticles = articles.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB.getTime() - dateA.getTime();
        });

        // Update posts based on creation time
        const updatedPosts = sortedArticles.map((post: any) => {
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

        setPosts(updatedPosts);
        setLoading(false);
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
