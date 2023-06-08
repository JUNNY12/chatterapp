import { MdFavorite } from "react-icons/md"
import { Typography } from "../element"
import { useState } from 'react';
import { useFetchUser } from "../../hooks/user/useFetchUser";
import { updateArticle } from "../../firebase/article";

interface LikeButtonProps {
    likeCounts: string[];
    allLikes: string[];
    likes: number;
    setAllLikes: (allLikes: string[]) => void;
    setLikes: React.Dispatch<React.SetStateAction<number>>;
    author: any;
    id: any;
}

export const LikeButton = ({ likeCounts, allLikes, likes, id,setAllLikes,author, setLikes }: LikeButtonProps) => {
    const { userInfo } = useFetchUser();
    const [liked, setLiked] = useState(allLikes.includes(userInfo.uid as string));
    console.log(allLikes)

    const handleLike = async  () => {
        if (liked) {
            const updatedLikeCounts = allLikes.filter(id => id !== userInfo.uid);
            setLiked(false);
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setAllLikes(updatedLikeCounts);
            setLikes(updatedLikeCounts.length);
        } else {
            const updatedLikeCounts = [...allLikes, userInfo.uid as string];
            setLiked(true);
            setAllLikes(updatedLikeCounts);
            await updateArticle(author?.uid, id, {
                likeCounts: updatedLikeCounts,
            });
            setLikes(updatedLikeCounts.length);
        }
    };

    return (
        <div
            className={`flex items-center me-6 ${liked ? 'text-pink-600 animate-pulse' : ''}`}
            onClick={handleLike}
        >
            <MdFavorite className="me-1" />
            <Typography variant={2} className="text-base">
                {likes || likeCounts?.length}
            </Typography>
        </div>
    )
}
