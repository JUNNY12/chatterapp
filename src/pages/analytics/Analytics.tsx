import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { getUserArticles } from '../../firebase/article';
import { Highlights } from './Highlights';

export interface Post {
    id: string;
    data: {
        updatedAt: string;
        views: number;
        body: string;
        comments: any[];
        likeCount: number;
        createdAt: string;
        subtitle: string;
        title: string;
        commentCount: number;
        slug: string;
        coverImage: string;
        author: {
            authorId: string;
        };
        tagList: string[];
    };
}

export default function Analytics(): React.JSX.Element {
    const [posts, setPosts] = useState<Post[]>([] as any);
    const [postSummaries, setPostSummaries] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();

    console.log(loading);

    //calculate the total summaries for each month
    const calcualtePostSummaries = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        const filteredPosts = posts.filter((post) => {
            const postDate = new Date(post.data.createdAt);
            const postMonth = postDate.getMonth() + 1;
            return postMonth === currentMonth;
        });

        const totalPosts = filteredPosts.length;
        const totalViews = filteredPosts.reduce(
            (sum: number, post: any) => sum + post.data.views,
            0
        );
        const totalLikes = filteredPosts.reduce(
            (sum: number, post: any) => sum + post.data.likeCount,
            0
        );
        const totalComments = filteredPosts.reduce(
            (sum: number, post: any) => sum + post.data.comments.length,
            0
        );
        const monthName = currentDate.toLocaleString('default', {
            month: 'long',
        });
        const currentYear = currentDate.getFullYear();

        const summary = {
            month: monthName,
            year: currentYear,
            totalPosts,
            totalViews,
            totalLikes,
            totalComments,
            filteredPosts,
        };
        setPostSummaries(summary);
    };

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                if (user) {
                    setLoading(true);
                    const userArticles = await getUserArticles(user?.uid);
                    setPosts(userArticles);
                    setLoading(false);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchUserArticles();
    }, [user]);

    useEffect(() => {
        calcualtePostSummaries();
    }, [posts]);

    let highestViewedLikedAndCommentedPost = null;
    if (posts.length > 0) {
        highestViewedLikedAndCommentedPost = posts.reduce(
            (prevPost, currentPost) => {
                if (
                    currentPost.data.views > prevPost.data.views ||
                    (currentPost.data.views === prevPost.data.views &&
                        currentPost.data.likeCount > prevPost.data.likeCount)
                ) {
                    return currentPost;
                }
                return prevPost;
            }
        );
    }

    console.log(highestViewedLikedAndCommentedPost);
    console.log(postSummaries);

    return (
        <section className={`bg-white-100`}>
            <div className={`ms-[250px] tabletS:ms-0 pt-24`}>
                <Highlights
                    highestPost={highestViewedLikedAndCommentedPost}
                    postSummaries={postSummaries}
                />
            </div>
            <div>
                {!loading && posts.length === 0 && (
                    <div className={`ms-[250px] tabletS:ms-0`}>
                        <div
                            className={`flex justify-center items-center h-[80vh]`}
                        >
                            <p className={`text-2xl font-bold`}>No posts yet</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
