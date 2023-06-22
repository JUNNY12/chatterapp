import { MdFavorite } from 'react-icons/md';
import { Typography } from '../element';
import usePostCard from '../../hooks/article/usePostCard';
import { useFetchUser } from '../../hooks/user/useFetchUser';
export const LikeButton = ({ post }: any) => {
   const { allLikes, handleLike, liked, likeCounts } = usePostCard(post);
   const { userInfo } = useFetchUser();

   return (
      <div
         role="button"
         className={`flex items-center me-6 cursor-pointer ${
            liked && userInfo.uid && 'text-pink-600 animate-pulse'
         }`}
         onClick={handleLike}
      >
         <MdFavorite className="me-1" />
         <Typography variant={2} className="text-base">
            {allLikes?.length || likeCounts?.length}
         </Typography>
      </div>
   );
};
