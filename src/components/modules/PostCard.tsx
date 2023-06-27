import React from 'react';
import { Typography } from '../../components/element';
import { MdInsights } from 'react-icons/md';
import { calculateReadingTime } from '../../utils';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { CommentInput, LikeButton } from '.';
import { BiComment } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import usePostCard from '../../hooks/article/usePostCard';
import { Link } from 'react-router-dom';
interface PostProps {
   post: SinglePostInterface;
}

//destructuring the props
export const PostCard = ({ post }: PostProps): React.JSX.Element => {
   const {
      theme,
      comment,
      showComment,
      allComments,
      isLoading,
      handleCommentChange,
      handleCommentSubmit,
      handleNavigate,
      navigate,
      handleShowComment,
      bookmarked,
      handleBookmark,
      title,
      subtitle,
      tagList,
      coverImage,
      createdAgo,
      body,
      views,
      comments,
      displayName,
      photoUrl,
      fullName,
      occupation,
   } = usePostCard(post);

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
         <article className="border-b relative border-gray-300 p-8 my-8 tabletXS:my-3 mobileXL:px-2 cursor-pointer">
            <div
               onClick={handleBookmark}
               title="Bookmark"
               className={`absolute right-2 top-2 p-2 rounded-full 
               ${bookmarked ? 'bg-pink-600 text-white-100' : 'bg-gray-300 text-black-950'}
               `}
            >
               <FaBookmark />
            </div>
            <div className=" flex items-center mb-3">
               <div
                  onClick={() => navigate(`/user/${displayName}`)}
                  className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 relative rounded-full object-cover"
               >
                  <img
                     src={photoUrl}
                     title={displayName}
                     alt={displayName}
                     className=" rounded-full object-cover w-full h-full"
                  />
               </div>
               <div className="">
                  <div className=" flex flex-wrap">
                     <Typography variant={1} className="font-bold text-2xl mobileXL:text-lg">
                        <Link
                           className="hover:underline hover:text-pink-600"
                           to={`/user/${displayName}`}
                        >
                           {fullName}
                        </Link>
                     </Typography>
                  </div>
                  <Typography
                     variant={2}
                     className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                  >
                     <span> {occupation} </span>
                     <span className=" ms-6 mobileXL:ms-3">{createdAgo}</span>
                  </Typography>
               </div>
            </div>

            <div onClick={handleNavigate}>
               <Typography variant={1} className=" text-3xl mobileXL:text-xl font-bold mb-2">
                  {title}
               </Typography>

               <Typography variant={2} className=" text-2xl mobileXL:text-lg font-normal mb-2">
                  {subtitle.substring(0, 75) + ' ... '}
               </Typography>

               <Typography variant={2} className="font-semibold mb-1">
                  {calculateReadingTime(body)} mins read
               </Typography>

               <div className="flex flex-wrap items-center my-3">
                  {tagList.map((tag: string, index: number) => (
                     <div key={index} className="me-2">
                        <span>#</span>
                        <span className=" text-sm font-semibold text-pink-600">{tag}</span>
                     </div>
                  ))}
               </div>

               <div>
                  <Typography variant={2} className="text-lg font-bold mb-3 text-pink-600">
                     Read More ...
                  </Typography>
               </div>

               {coverImage && (
                  <div className=" relative object-cover max-w-[600px] h-[300px] my-3">
                     <img src={coverImage} alt={title} className=" object-cover h-full w-full" />
                  </div>
               )}
            </div>

            <div className=" flex items-center justify-center mt-12 text-xl">
               <div onClick={handleShowComment} className=" flex items-center me-6">
                  <BiComment className=" me-1" />
                  <Typography variant={2} className="text-base">
                     {allComments.length || comments.length}
                  </Typography>
               </div>

               <div role="button">
                  <LikeButton post={post} />
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
