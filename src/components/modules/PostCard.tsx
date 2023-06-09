import React, { useEffect } from 'react';
import { Typography } from '../../components/element';
import { MdInsights } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { calculateReadingTime } from '../../utils';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { updateArticle } from '../../firebase/article';
import { useState } from 'react';
import { CommentInput,LikeButton } from '.';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { BiComment } from "react-icons/bi"

interface PostProps {
    post: SinglePostInterface;
}

//destructuring the props
export const PostCard = ({ post }: PostProps): React.JSX.Element => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const location= useLocation();
    // const {pathname}=location;

    const { userInfo } = useFetchUser();

    //comments state
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const [allComments, setAllComments] = useState(post.comments);
    const [isLoading, setIsLoading] = useState(false);

    //likes state
    const [likes, setLikes] = useState(post.likeCounts.length);
    const [allLikes, setAllLikes] = useState(post.likeCounts);

    // console.log('allComments', post.comments);

    useEffect(() => {
        setAllComments(post?.comments);
        setAllLikes(post?.likeCounts);
    }, [ location]);

   

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };


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
            toast.success('Comment submitted successfully',{
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log('Comment submitted:', comment);
            setComment('');
            setShowComment(false);
            setIsLoading(false);
        }
        catch (err) {
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

    // console.log(likeCounts);

    const { displayName, photoUrl, fullName, occupation } = author;

    const handleNavigate = () => {
        // await updateArticle(data.uid, id, { views: views + 1 });
        navigate(
            `/post/${fullName.split(' ').join('_')}/${slug
                .split(' ')
                .join('_')}`
        );
    };

 

    return (
        <div
            className={`rounded-md m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${theme === 'lightMode'
                    ? 'bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                }
        `}
        >
            <article className="border-b border-gray-300 p-8 my-8 tabletXS:my-3 mobileXL:px-2 cursor-pointer">
                <div
                    onClick={() => navigate(`/user/${displayName}`)}
                    className=" flex items-center mb-3"
                >
                    <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 relative rounded-full object-cover">
                        <img
                            src={photoUrl}
                            title={displayName}
                            alt={displayName}
                            className=" rounded-full object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <Typography
                            variant={1}
                            className="font-bold text-2xl mobileXL:text-lg"
                        >
                            {fullName}
                        </Typography>
                        <Typography
                            variant={2}
                            className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                        >
                            <span> {occupation} </span>
                            <span className=" ms-6 mobileXL:ms-3">
                                {createdAgo}
                            </span>
                        </Typography>
                    </div>
                </div>

                <div onClick={handleNavigate}>
                    <Typography
                        variant={1}
                        className=" text-3xl mobileXL:text-xl font-bold mb-2"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={2}
                        className=" text-2xl mobileXL:text-lg font-normal mb-2"
                    >
                        {subtitle.substring(0, 75) + ' ... '}
                    </Typography>

                    <Typography variant={2} className="font-semibold mb-1">
                        {calculateReadingTime(body)} mins read
                    </Typography>

                    <div className="flex flex-wrap items-center my-3">
                        {tagList.map((tag, index) => (
                            <div key={index} className="me-2">
                                <span>#</span>
                                <span className=" text-sm font-semibold text-pink-600">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Typography
                            variant={2}
                            className="text-lg font-bold mb-3 text-pink-600"
                        >
                            Read More ...
                        </Typography>
                    </div>

                    <div className=" relative object-cover max-w-[600px] h-[300px] my-3">
                        <img
                            src={coverImage}
                            alt={title}
                            className=" object-cover h-full w-full"
                        />
                    </div>
                </div>

                <div className=" flex items-center justify-center mt-12 text-xl">
                    <div
                        onClick={() => setShowComment(!showComment)}
                        className=" flex items-center me-6"
                    >
                        <BiComment className=" me-1" />
                        <Typography variant={2} className="text-base">
                            {allComments.length || comments.length}
                        </Typography>
                    </div>

                    <div role="button">
                        <LikeButton
                            likeCounts={likeCounts}
                            author={author}
                            likes={likes}
                            setLikes={setLikes}
                            id={id}
                            allLikes={allLikes}
                            setAllLikes={setAllLikes}
                        />
                    </div>

                    <div className=" flex items-center me-6">
                        <MdInsights className="me-1 " />
                        <Typography variant={2} className="text-base">
                            {views}
                        </Typography>
                    </div>
                </div>
                <div className="mt-3">
                    {showComment && (
                        <CommentInput
                            isLoading={isLoading}
                            value={comment}
                            onCommentChange={handleCommentChange}
                            onCommentSubmit={handleCommentSubmit}
                        />
                    )}
                </div>
            </article>
        </div>
    );
};