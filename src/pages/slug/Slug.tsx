import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { SinglePageLoader } from '../../components/modules/skeletonloader';
import { CommentSection } from './CommentSection';
import { useSlug } from '../../hooks/article/useSlug';
import { AuthorProfile } from './AuthorProfile';
import { Content } from './Content';

export default function Slug(): React.JSX.Element {
   const { slug } = useParams();
   const { theme } = useThemeContext();

   const {
      singlePost,
      posts,
      loading,
      handleNavigate,
      allComments,
      comment,
      handleCommentSubmit,
      handleCommentChange,
      handleReplyChange,
      handleReplySubmit,
      handleCommentSelected,
      selectedComment,
      showReplyInput,
      reply,
      isLoading,
      handlePageView,
      handleShowComment,
      showComment,
      updatedComments,
      updatedRepliesWithComment,
      handleReplySelected,
      showReplyField,
   } = useSlug(slug);

   useEffect(() => {
      handlePageView();
   });

   return (
      <section className={` bg-white-100 h-max`}>
         {(loading && posts.length === 0) ||
         (!loading && posts.length === 0) ||
         (loading && posts.length !== 0) ? (
            <SinglePageLoader />
         ) : (
            <div className={` ms-[250px] tabletS:ms-0 pt-24   `}>
               <div
                  className={` border border-gray-300 flex laptopS:flex-col justify-between rounded-sm m-8 mb-8 tabletXS:m-3 tabletXS:mb-8 h-full transition duration-500 ease-in-out p-8 mobileXL:px-2 
                        ${
                           theme === 'lightMode'
                              ? 'bg-white-50 text-black-950'
                              : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                        }
                        `}
               >
                  <div>
                     <Content
                        singlePost={singlePost}
                        allComments={allComments}
                        comment={comment}
                        isLoading={isLoading}
                        handleCommentSubmit={handleCommentSubmit}
                        handleCommentChange={handleCommentChange}
                     />

                     <div>
                        <CommentSection
                           comments={updatedComments}
                           showComment={showComment}
                           handleShowComment={handleShowComment}
                           handleReplyChange={handleReplyChange}
                           handleReplySubmit={handleReplySubmit}
                           reply={reply}
                           showReplyInput={showReplyInput}
                           isLoading={isLoading}
                           selectedComment={selectedComment}
                           handleCommentSelected={handleCommentSelected}
                           updatedRepliesWithComment={updatedRepliesWithComment}
                           handleReplySelected={handleReplySelected}
                           showReplyField={showReplyField}
                        />
                     </div>
                  </div>
                  <div>
                     <AuthorProfile author={singlePost?.author} handleNavigate={handleNavigate} />
                  </div>
               </div>
            </div>
         )}
      </section>
   );
}
