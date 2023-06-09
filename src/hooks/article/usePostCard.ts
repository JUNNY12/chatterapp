import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { updateArticle } from '../../firebase/article';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { toast } from 'react-toastify';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';

const usePostCard = (post: SinglePostInterface) => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const location = useLocation();

    //get userInfo from useFetchUser hook
    const { userInfo } = useFetchUser();

    // state for comment
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [allComments, setAllComments] = useState(post?.comments);
    const [isLoading, setIsLoading] = useState(false);

    // state for likes
    const [likes, setLikes] = useState(post?.likeCounts?.length);
    const [allLikes, setAllLikes] = useState(post?.likeCounts);

    useEffect(() => {
        setAllComments(post?.comments);
        setAllLikes(post?.likeCounts);
    }, [location]);

    // handle comment input change
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    // handle comment submit
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
            await updateArticle(author?.uid, id, {
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
            setShowComment(false);
            setIsLoading(false);
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

    // handle navigate to single post
    const handleNavigate = () => {
        navigate(
            `/post/${fullName.split(' ').join('_')}/${slug
                .split(' ')
                .join('_')}`
        );
    };

    // destructure post
    const {
        id,
        title,
        coverImage,
        subtitle,
        tagList,
        author = {} as any,
        createdAgo,
        slug,
        body,
        views,
        comments,
        likeCounts,
    } = post;

    // destructure author
    const { displayName, photoUrl, fullName, occupation } = author;

    // return the values needed for the component
    return {
        theme,
        comment,
        showComment,
        setShowComment,
        allComments,
        isLoading,
        likes,
        setLikes,
        setAllLikes,
        allLikes,
        handleCommentChange,
        handleCommentSubmit,
        handleNavigate,
        navigate,
        id,
        title,
        subtitle,
        tagList,
        coverImage,
        createdAgo,
        author,
        body,
        views,
        comments,
        likeCounts,
        displayName,
        photoUrl,
        fullName,
        occupation,
    };
};

export default usePostCard;
