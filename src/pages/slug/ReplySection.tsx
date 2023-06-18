import { Typography } from '../../components/element';
import { formatDate } from '../../utils/formatDate';
import formatTime from '../../utils/formatTime';
import { MdFavorite } from 'react-icons/md';
import { useFetchUser } from '../../hooks/user/useFetchUser';

interface ReplySectionProps {
   reply: any;
   isLastReply: boolean;
   handleReplyLiked: (commentId: any, replyId: any) => void;
   commentId: any;
   replyId: any;
}

export const ReplySection = ({
   reply,
   isLastReply,
   commentId,
   handleReplyLiked,
   replyId,
}: ReplySectionProps) => {
   const { userInfo } = useFetchUser();

   return (
      <div>
         <div className={`mt-4 ${isLastReply ? '' : 'border-b pb-4 border-gray-300'}`}>
            <div className="ps-4 flex items-center">
               <div className=" w-12 h-12 rounded-full object-cover ">
                  <img
                     src={reply.user?.photoUrl}
                     alt="user"
                     className="w-full h-full object-cover rounded-full"
                  />
               </div>
               <div className="ms-4 leading-5">
                  <Typography className=" text-xl  font-bold mobileL:text-base" variant={2}>
                     {reply.user?.fullName}
                  </Typography>

                  <Typography className=" text-[14px]" variant={2}>
                     {reply.user?.occupation}
                  </Typography>

                  <Typography className="text-[12px]" variant={2}>
                     <span>{formatDate(reply.createdAt)}</span>
                     <span className=" ms-4">{formatTime(reply.createdAt)}</span>
                  </Typography>
               </div>
            </div>
            <div className="ps-4 mt-2">
               <p>{reply.reply}</p>
            </div>
            <div
               onClick={() => handleReplyLiked(commentId, replyId)}
               className="ps-4 cursor-pointer"
               role="button"
            >
               <MdFavorite
                  className={`
                   text-[20px] inline-block me-1
                  ${
                     reply?.replyLikes?.includes(userInfo?.uid) && userInfo?.uid
                        ? 'text-pink-600 animate-pulse'
                        : ' text-white-50'
                  }
                  `}
               />
               <Typography className="text-base inline-block" variant={2}>
                  {reply?.replyLikes?.length}
               </Typography>
            </div>
         </div>
      </div>
   );
};
