import { Button, Typography } from '../../components/element';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Comment } from '../../context/article/FetchAllPostContext';
import { formatDate } from '../../utils/formatDate';
import { BiComment } from 'react-icons/bi';
import formatTime from '../../utils/formatTime';
import { ReplyInput } from '../../components/modules/ReplyInput';
import { MdFavorite } from 'react-icons/md';
import { ReplySection } from './ReplySection';
import { useFetchUser } from '../../hooks/user/useFetchUser';

interface CommentProps {
   comments: Comment[];
   handleReplyLiked: (commentId: any, replyId: any) => void;
   handleCommentLiked: (commentId: any) => void;
   showComment: boolean;
   handleCommentSelected: (comment: any) => void;
   handleShowComment: () => void;
   selectedComment: any;
   handleReplyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   handleReplySubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   reply: any;
   isLoading: boolean;
   showReplyInput: any;
   updatedRepliesWithComment: any;
   handleReplySelected: (reply: any) => void;
   showReplyField: any;
}
export const CommentSection = ({
   comments,
   showComment,
   handleShowComment,
   handleCommentSelected,
   showReplyInput,
   reply,
   selectedComment,
   handleReplyChange,
   handleReplySubmit,
   isLoading,
   updatedRepliesWithComment,
   handleReplySelected,
   showReplyField,
   handleCommentLiked,
   handleReplyLiked,
}: CommentProps): React.JSX.Element => {
   const { userInfo } = useFetchUser();

   return (
      <section>
         <div className=" mt-12">
            <Typography
               onClick={handleShowComment}
               role="button"
               className=" inline-flex items-center text-2xl mobileXL:text-xl"
               variant={2}
            >
               <span>Show Comments</span>
               <span>
                  {showComment ? (
                     <FaCaretUp className="inline-block ms-2" />
                  ) : (
                     <FaCaretDown className="inline-block ms-2" />
                  )}
               </span>
            </Typography>
         </div>

         {/* comment section */}
         {showComment && (
            <div>
               {comments.length === 0 ? (
                  <div className="mt-4">
                     <Typography variant={1} className="text-2xl text-center text-pink-600">
                        No comments yet
                     </Typography>
                  </div>
               ) : (
                  <div>
                     {/* mapping through comments */}
                     {updatedRepliesWithComment?.map((comment: any) => {
                        // console.log(comment);
                        return (
                           <div
                              key={comment.commentId}
                              className=" mt-12 p-4 rounded-md bg-gray-500 text-white-50"
                           >
                              <div className="flex items-center">
                                 <div className=" w-12 h-12 rounded-full object-cover ">
                                    <img
                                       src={comment.user?.photoUrl}
                                       alt="user"
                                       className="w-full h-full object-cover rounded-full"
                                    />
                                 </div>
                                 <div className="ms-4">
                                    <Typography
                                       className=" text-xl font-bold mobileL:text-base"
                                       variant={2}
                                    >
                                       {comment.user?.fullName}
                                    </Typography>

                                    <Typography className=" text-[14px]" variant={2}>
                                       {comment.user?.occupation}
                                    </Typography>

                                    <Typography className="text-[12px]" variant={2}>
                                       <span>{formatDate(comment.createdAt)}</span>
                                       <span className=" ms-4">
                                          {formatTime(comment.createdAt)}
                                       </span>
                                    </Typography>
                                 </div>
                              </div>
                              <div className="mt-4 text-lg  ">
                                 <p>{comment.comment}</p>

                                 <div className="mt-4 flex ">
                                    <div onClick={() => handleCommentLiked(comment?.commentId)}>
                                       <MdFavorite
                                          className={`
                                          text-[20px] inline-block me-1 cursor-pointer 
                                          ${
                                             comment?.commentLikes?.includes(userInfo?.uid) &&
                                             userInfo?.uid
                                                ? 'text-pink-600 animate-pulse'
                                                : 'text-white-50'
                                          }
                                          `}
                                       />
                                       <span className="text-base">
                                          {comment?.commentLikes?.length}
                                       </span>
                                    </div>

                                    <div className="ms-4">
                                       <Typography
                                          title="Reply"
                                          onClick={() => handleCommentSelected(comment)}
                                          className="text-[20px] cursor-pointer"
                                          variant={2}
                                       >
                                          <BiComment className="inline-block me-1" />
                                          <span className="text-base">
                                             {comment?.replies?.length}
                                          </span>
                                       </Typography>
                                    </div>
                                 </div>

                                 <div>
                                    {comment?.replies?.length > 0 && (
                                       <div className="mt-3 mb-4">
                                          <Button
                                             onClick={() => handleReplySelected(comment)}
                                             title="show replies"
                                             className="px-2 py-1  bg-pink-600 text-white-50 rounded-[20px]"
                                          >
                                             {showReplyField.includes(comment?.commentId) ? (
                                                <span>
                                                   <span>
                                                      <FaCaretUp className="inline-block me-1" />
                                                   </span>
                                                   <span className="text-[14px] font-normal inline-block">
                                                      Hide
                                                      {comment?.replies?.length > 1
                                                         ? ' Replies'
                                                         : ' Reply'}
                                                   </span>
                                                </span>
                                             ) : (
                                                <span className="text-[14px] inline-block font-normal ">
                                                   <span>
                                                      <FaCaretDown className="inline-block me-1" />
                                                   </span>
                                                   <span>
                                                      {comment?.replies?.length > 1
                                                         ? `${comment?.replies?.length} Replies`
                                                         : `${comment?.replies?.length} Reply`}
                                                   </span>
                                                </span>
                                             )}
                                          </Button>
                                       </div>
                                    )}
                                 </div>

                                 {/* replies */}
                                 <div>
                                    {selectedComment?.commentId === comment?.commentId &&
                                       showReplyField.includes(comment?.commentId) && (
                                          <div>
                                             {comment?.replies?.length > 0 && (
                                                <div className="ms-6 border-l-2 border-gray-300 border-b-2 pb-4 ">
                                                   <div>
                                                      {comment?.replies?.map(
                                                         (reply: any, index: number) => {
                                                            const isLastReply =
                                                               index === comment.replies.length - 1;
                                                            return (
                                                               <ReplySection
                                                                  key={reply.replyId}
                                                                  reply={reply}
                                                                  handleReplyLiked={
                                                                     handleReplyLiked
                                                                  }
                                                                  commentId={comment?.commentId}
                                                                  replyId={reply?.replyId}
                                                                  isLastReply={isLastReply}
                                                               />
                                                            );
                                                         }
                                                      )}
                                                   </div>
                                                </div>
                                             )}
                                          </div>
                                       )}
                                 </div>
                                 {/* reply input */}
                                 {selectedComment?.commentId === comment?.commentId &&
                                    showReplyInput.includes(comment?.commentId) && (
                                       <ReplyInput
                                          isLoading={isLoading}
                                          value={reply}
                                          onReplyChange={handleReplyChange}
                                          onReplySubmit={handleReplySubmit}
                                       />
                                    )}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         )}
      </section>
   );
};
