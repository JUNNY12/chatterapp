import { Typography } from '../../components/element';
import { MdInsights } from 'react-icons/md';
import { BiComment } from 'react-icons/bi';
import { MdLaoder } from './MdLoader';
import { CommentInput } from '../../components/modules';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { LikeButton } from '../../components/modules';

interface ContentProps {
   singlePost: any;
   comment: string;
   allComments: any;
   isLoading: boolean;
   handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   handleCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Content = ({
   singlePost,
   comment,
   isLoading,
   handleCommentChange,
   handleCommentSubmit,
   allComments,
}: ContentProps): React.JSX.Element => {
   const { userInfo } = useFetchUser();

   return (
      <div>
         <article className="me-8 laptopS:me-0">
            {singlePost?.coverImage && (
               <div className=" max-w-[600px] mb-4 h-[400px] tabletS:h-[300px] object-cover relative">
                  <img
                     src={singlePost?.coverImage}
                     className=" object-cover h-full w-full"
                     alt=""
                  />
               </div>
            )}
            <Typography
               variant={1}
               className=" font-semibold text-3xl tabletXS:text-xl mb-3 max-w-[600px]"
            >
               {singlePost?.title}.
            </Typography>

            <Typography
               variant={1}
               className=" font-normal text-xl tabletXS:text-lg mb-3 max-w-[600px]"
            >
               {singlePost?.subtitle}.
            </Typography>

            <div>
               <MdLaoder content={singlePost?.body} />
            </div>

            <div className="flex flex-wrap items-center my-3">
               {singlePost?.tagList.map((tag: string, index: number) => (
                  <div key={index} className="me-1">
                     <span>#</span>
                     <span className=" me-2 mb-2 text-sm font-semibold text-pink-600">{tag}</span>
                  </div>
               ))}
            </div>

            <div className=" flex items-center justify-center mt-12 text-xl">
               <div className=" flex items-center me-3">
                  <BiComment className=" me-1" />
                  <Typography variant={2} className="text-base">
                     {allComments?.length || singlePost?.comments.length}
                  </Typography>
               </div>

               <LikeButton post={singlePost} />

               <div className=" flex items-center me-1">
                  <MdInsights className=" me-2" />
                  <Typography variant={2} className="text-base">
                     {singlePost?.views}
                  </Typography>
               </div>
            </div>
         </article>

         <div className=" mt-8">
            {userInfo?.uid ? (
               <CommentInput
                  isLoading={isLoading}
                  value={comment}
                  onCommentChange={handleCommentChange}
                  onCommentSubmit={handleCommentSubmit}
               />
            ) : (
               <Typography
                  variant={1}
                  className="text-2xl mobileXL:text-xl  text-center font-semibold text-pink-600"
               >
                  Please login to comment
               </Typography>
            )}
         </div>
      </div>
   );
};
