import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { SinglePageLoader } from '../../components/modules/skeletonloader';
import { CommentSection } from './CommentSection';
import { useSlug } from '../../hooks/article/useSlug';
import { AuthorProfile } from './AuthorProfile';
import { Content } from './Content';
import { MetaTag } from '../../components/metatag/MetaTag';

export default function Slug(): React.JSX.Element {
   const { theme } = useThemeContext();
   const { slug } = useParams();

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
      handleCommentLiked,
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
      handleReplyLiked,
   } = useSlug(slug);

   useEffect(() => {
      handlePageView();
   });

   return (
      <>
         <MetaTag
            title={`Chatter | Post | ${singlePost?.title}`}
            description={singlePost?.subtitle}
            href={`/post/${singlePost?.author?.fullName?.split(' ')?.join('_')}/${singlePost?.slug
               ?.split(' ')
               ?.join('_')}`}
            image={singlePost?.coverImage}
            ogTitle={`${singlePost?.title}`}
            url={`/post/${singlePost?.author?.fullName?.split(' ')?.join('_')}/${singlePost?.slug
               ?.split(' ')
               ?.join('_')}`}
            twitterTitle={`${singlePost?.title}`}
            twitterDescription={singlePost?.subtitle}
            twitterImage={singlePost?.coverImage}
            twitterCard="summary"
            ogType="article"
         />
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
                              handleCommentLiked={handleCommentLiked}
                              reply={reply}
                              showReplyInput={showReplyInput}
                              isLoading={isLoading}
                              selectedComment={selectedComment}
                              handleCommentSelected={handleCommentSelected}
                              updatedRepliesWithComment={updatedRepliesWithComment}
                              handleReplySelected={handleReplySelected}
                              showReplyField={showReplyField}
                              handleReplyLiked={handleReplyLiked}
                           />
                        </div>
                     </div>
                     <div>
                        <AuthorProfile
                           author={singlePost?.author}
                           singlePost={singlePost}
                           handleNavigate={handleNavigate}
                        />
                     </div>
                  </div>
               </div>
            )}
         </section>
      </>
   );
}
