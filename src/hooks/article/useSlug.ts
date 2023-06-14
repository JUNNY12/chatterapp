import { useEffect, useState } from 'react';
import { updateArticle, getAllArticle } from '../../firebase/article';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { getUser } from '../../firebase/user';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { Author } from '../../context/article/FetchAllPostContext';
import { useNavigate } from 'react-router';
import { useFetchUser } from '../user/useFetchUser';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';

export const useSlug = (slug: any) => {
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState<SinglePostInterface[]>([]);
   const formattedSlug = slug?.split('_').join(' ');
   const location = useLocation();

   const singlePost: any = posts.find(({ slug }: any) => slug === formattedSlug);

   const [allComments, setAllComments] = useState<any>([]);
   const [comment, setComment] = useState('');
   const [reply, setReply] = useState('');
   const [showReplyInput, setShowReplyInput] = useState<string[]>([]);
   const [showReplyField, setShowReplyField] = useState<string[]>([]);
   const [selectedComment, setSelectedComment] = useState<any>();
   const [isLoading, setIsLoading] = useState(false);
   const [commentSubmitted, setCommentSubmitted] = useState(false);
   const { userInfo } = useFetchUser();
   const [updatedComments, setUpdatedComments] = useState<any>([]);
   const [showComment, setShowComment] = useState<boolean>(false);
   const [updatedRepliesWithComment, setUpdatedRepliesWithComment] = useState<any>([]);

   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
   };

   const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReply(e.target.value);
   };

   const handleCommentSelected = (comment: any) => {
      setSelectedComment(comment);
     if(userInfo?.uid){
         setShowReplyInput((prevState) => {
         if (prevState.includes(comment.commentId)) {
            // Comment ID already exists, remove it to hide the reply input
            return prevState.filter((id) => id !== comment.commentId);
         } else {
            // Comment ID doesn't exist, add it to show the reply input
            return [...prevState, comment.commentId];
         }
      });
     }
     else{
        toast.error('You need to login to comment', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         setTimeout(() => {
            navigate('/onboard');
         }, 2000);
     }
   };

   const handleReplySelected = (comment: any) => {
      setSelectedComment(comment);
      setShowReplyField((prevState) => {
         if (prevState.includes(comment.commentId)) {
            // Comment ID already exists, remove it to hide the reply input
            return prevState.filter((id) => id !== comment.commentId);
         } else {
            // Comment ID doesn't exist, add it to show the reply input
            return [...prevState, comment.commentId];
         }
      });
   };

   //handle reply submit
   const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         setIsLoading(true);
         const newReply = {
            replyId: new Date().getTime().toString(),
            createdAt: new Date().toISOString(),
            reply,
            replierId: userInfo.uid,
         };
         const updatedSelectedComment = {
            ...selectedComment,
            replies: [...selectedComment?.replies, newReply],
         };
         const updatedComments = allComments.map((comment: any) =>
            comment.commentId === selectedComment.commentId ? updatedSelectedComment : comment
         );
         setAllComments(updatedComments);
         await updateArticle(singlePost?.author?.uid, singlePost?.id, {
            comments: updatedComments,
         });
         toast.success('Reply submitted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         setReply('');
         setIsLoading(false);
         setShowReplyInput((prevState) =>
            prevState.filter((id) => id !== selectedComment.commentId)
         );
      } catch (err) {
         console.log(err);
         toast.error('Something went wrong, try again', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   //handle comment submit
   const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         setIsLoading(true);
         const newComment = {
            commentId: new Date().getTime().toString(),
            createdAt: new Date().toISOString(),
            comment,
            commentorId: userInfo.uid,
            replies: [],
         };
         setAllComments([...allComments, newComment]);
         await updateArticle(singlePost?.author?.uid, singlePost?.id, {
            comments: [...allComments, newComment],
         });
         toast.success('Comment submitted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         setComment('');
         setIsLoading(false);
         setCommentSubmitted(true);
      } catch (err) {
         console.log(err);
         toast.error('something went wrong, try again', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   const navigate = useNavigate();

   //handle navigate to author profile
   const handleNavigate = () => {
      navigate(`/user/${singlePost?.author?.displayName}`);
   };

   //fetch post
   const fetchPosts = async () => {
      setLoading(true);
      try {
         const { articles } = await getAllArticle();
         // Sort articles in descending order based on creation time
         const sortedArticles = articles.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
         });
         // Fetch author details for each article by authorId
         const updatedPosts = await Promise.all(
            sortedArticles.map(async (post: any) => {
               const createdDate = new Date(post.createdAt);
               const currentDate = new Date();
               const timeDifference = currentDate.getTime() - createdDate.getTime();
               // Fetch author details using authorId
               const author = await getUser(post.author.authorId);
               // Update the post object with the relative time and author details
               return {
                  ...post,
                  createdAgo: getTimeDifferenceString(timeDifference),
                  author: author as Author,
               };
            })
         );
         setPosts(updatedPosts);
         setLoading(false);
      } catch (error) {
         console.log('Error fetching posts:', error);
         setLoading(false);
      }
   };

   // handle page view
   const handlePageView = async () => {
      const post = posts.find(({ slug }: any) => slug === formattedSlug);
      if (post) {
         const { id, views, author = {} as any } = post;
         const newViews = views + 1;
         await updateArticle(author?.uid, id, { views: newViews });
      }
   };

   //get comments with user info
   const getCommentsWithUserInfo = async () => {
      try {
         const sortedComments = allComments?.sort((a: any, b: any) => {
            const dateA = new Date(a?.createdAt);
            const dateB = new Date(b?.createdAt);
            return dateB.getTime() - dateA.getTime();
         });

         const getAllComments = await Promise.all(
            sortedComments.map(async (comment: any) => {
               const user = await getUser(comment.commentorId);
               return {
                  ...comment,
                  user,
               };
            })
         );
         setUpdatedComments(getAllComments);
      } catch (err) {
         console.log(err);
      }
   };

   //get replies with user info and update it with comments
   const getRepliesWithUserInfo = async () => {
      try {
         const updatedCommentsWithReplies = await Promise.all(
            allComments.map(async (comment: any) => {
               const user = await getUser(comment.commentorId);
               const updatedReplies = await Promise.all(
                  comment.replies.map(async (reply: any) => {
                     const replyUser = await getUser(reply.replierId);
                     return {
                        ...reply,
                        user: replyUser,
                     };
                  })
               );
               return {
                  ...comment,
                  user,
                  replies: updatedReplies,
               };
            })
         );
         setUpdatedRepliesWithComment(updatedCommentsWithReplies);
      } catch (err) {
         console.log(err);
      }
   };

   const handleShowComment = () => {
      setShowComment(!showComment);
   };

   useEffect(() => {
      fetchPosts();
   }, [slug, commentSubmitted]);

   useEffect(() => {
      getCommentsWithUserInfo();
      getRepliesWithUserInfo();
   }, [allComments, commentSubmitted]);

   useEffect(() => {
      handlePageView();
   }, [location]);

   useEffect(() => {
      setAllComments(singlePost?.comments || []);
      setCommentSubmitted(false);
   }, [singlePost, commentSubmitted]);

   // console.log(allComments, 'allComments')

   return {
      singlePost,
      posts,
      loading,
      handleNavigate,
      allComments,
      comment,
      handleCommentSubmit,
      handleCommentChange,
      isLoading,
      handlePageView,
      updatedComments,
      showComment,
      handleShowComment,
      setSelectedComment,
      selectedComment,
      handleReplyChange,
      handleReplySubmit,
      reply,
      handleCommentSelected,
      showReplyInput,
      updatedRepliesWithComment,
      handleReplySelected,
      showReplyField,
   };
};
