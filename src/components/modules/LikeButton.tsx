import { MdFavorite } from 'react-icons/md';
import { Typography } from '../element';
import usePostCard from '../../hooks/article/usePostCard';

export const LikeButton = ({ post }: any) => {
    const { allLikes, handleLike, liked, likeCounts } = usePostCard(post);

    return (
        <div
            role='button'
            className={`flex items-center me-6 cursor-pointer ${
                liked && 'text-pink-600 animate-pulse'
            }`}
            onClick={handleLike}
        >
            <MdFavorite className="me-1" />
            <Typography variant={2} className="text-base">
                {allLikes.length || likeCounts.length}
            </Typography>
        </div>
    );
};
