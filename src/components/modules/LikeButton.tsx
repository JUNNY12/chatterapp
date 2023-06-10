import React, { useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Typography } from '../element';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { updateArticle } from '../../firebase/article';

interface LikeButtonProps {
    likeCounts: string[];
    likes: number;
    setLikes: React.Dispatch<React.SetStateAction<number>>;
    author: any;
    allLikes: string[];
    setAllLikes: React.Dispatch<React.SetStateAction<string[]>>;
    id: any;
}

export const LikeButton = ({
    likeCounts,
    likes,
    id,
    author,
    setLikes,
    allLikes,
    setAllLikes,
}: LikeButtonProps) => {
    const { userInfo } = useFetchUser();
    const [liked, setLiked] = useState(
        allLikes.includes(userInfo.uid as string)
    );

    console.log(setAllLikes);
    const handleLike = async () => {
        if (liked) {
            const updatedLikeCounts = allLikes.filter(
                (id) => id !== userInfo.uid
            );
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setLiked(false); // Update the like status to false
            setLikes(likes - 1); // Update the like count
        } else {
            const updatedLikeCounts = [...allLikes, userInfo.uid as string];
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setLiked(true); // Update the like status to true
            setLikes(likes + 1); // Update the like count
        }
    };

    return (
        <div
            className={`flex items-center me-6 ${
                allLikes.includes(userInfo.uid) && 'text-pink-600 animate-pulse'
            }`}
            onClick={handleLike}
        >
            <MdFavorite className="me-1" />
            <Typography variant={2} className="text-base">
                {likeCounts.length}
            </Typography>
        </div>
    );
};
