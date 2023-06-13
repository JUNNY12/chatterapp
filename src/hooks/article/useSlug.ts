import { useEffect, useState } from 'react';
import { updateArticle, getAllArticle } from '../../firebase/article';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { getUser } from '../../firebase/user';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { Author } from '../../context/article/FetchAllPostContext';
import { useNavigate } from 'react-router';
import { useFetchUser } from '../user/useFetchUser';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';

export const useSlug = (slug: any) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<SinglePostInterface[]>([]);
    const formattedSlug = slug?.split('_').join(' ');
    const location = useLocation();

    const singlePost: any = posts.find(
        ({ slug }: any) => slug === formattedSlug
    );

    const [allComments, setAllComments] = useState<any>([]);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [commentSubmitted, setCommentSubmitted] = useState(false);
    const { userInfo } = useFetchUser();

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const newComment = {
                commentId: new Date().getTime().toString(),
                createdAt: new Date().toISOString(),
                comment,
                commentorId: userInfo.uid,
            };
            setAllComments([...allComments, newComment]);
            await updateArticle(singlePost?.author?.uid, singlePost?.id, {
                comments: [...allComments, newComment],
            });
            toast.success('Comment submitted successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setComment('');
            setIsLoading(false);
            setCommentSubmitted(true);
        } catch (err) {
            console.log(err);
            toast.error('something went wrong, try again', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/user/${singlePost?.author?.displayName}`);
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { articles } = await getAllArticle();
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

    const handlePageView = async () => {
        const post = posts.find(({ slug }: any) => slug === formattedSlug);
        if (post) {
            const { id, views, author = {} as any } = post;
            const newViews = views + 1;
            await updateArticle(author?.uid, id, { views: newViews });
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [slug, commentSubmitted]);

    useEffect(() => {
        handlePageView();
    }, [location, slug]);

    useEffect(() => {
        setAllComments(singlePost?.comments || []);
        setCommentSubmitted(false);
    }, [singlePost, commentSubmitted]);

    return {
        singlePost,
        posts,
        loading,
        handleNavigate,
        allComments,
        comment,
        handleCommentSubmit,
        handleCommentChange,
        isLoading,
        handlePageView,
    };
};
