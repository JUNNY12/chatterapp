import React, { useEffect } from 'react';
import { Typography } from '../../components/element';
import { FaComment } from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { calculateReadingTime } from '../../utils';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { updateArticle } from '../../firebase/article';
import { useState } from 'react';
import { Comment } from '.';
import { useFetchUser } from '../../hooks/user/useFetchUser';

interface PostProps {
    post: SinglePostInterface;
}

//destructuring the props
export const PostCard = ({ post }: PostProps): React.JSX.Element => {
    const navigate = useNavigate();
    const { theme } = useThemeContext();
    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState(false);
    const {userInfo} = useFetchUser();
    const [allComments, setAllComments] = useState(post.comments);
    const [allLikes, setAllLikes] = useState(post.likeCounts);
    const [like, setLike] = useState(false);
    // const [likeCount, setLikeCount] = useState(post.likeCounts.length);

    console.log('allComments', post.comments);
   
    useEffect(() => {
        setAllComments(post?.comments);
        setAllLikes(post?.likeCounts);
    }, [post]);

    console.log('allComments', allComments.length);
    console.log('allLikes', allLikes);
    console.log(post.likeCounts)

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

            console.log('Comment submitted:', comment);
            setComment('');
            setShowComment(false);
        }
        catch (err) {
            console.log(err);
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

    const handleLike = async () => {
        const liked = likeCounts.includes(userInfo.uid as string);

        if (liked) {
            const updatedLikeCounts = likeCounts.filter((id) => id !== userInfo.uid);
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setLike(false); // Update the like state
        } else {
            const updatedLikeCounts = [...likeCounts, userInfo.uid as string];
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setLike(true); // Update the like state
        }
    };

    return (
        <div
            className={`rounded-md m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
             theme === 'lightMode'
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
                        <FaComment className=" me-1" />
                        <Typography variant={2} className="text-base">
                            {allComments.length || comments.length}
                        </Typography>
                    </div>

                    <div
                        className={`${like ? 'text-pink-600' : ''
                            } flex items-center me-6`}
                        onClick={handleLike}
                    >
                        <MdFavorite className={`me-1`} />
                        <Typography variant={2} className="text-base">
                            {allLikes?.length || likeCounts?.length}
                        </Typography>
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
                        <Comment
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
