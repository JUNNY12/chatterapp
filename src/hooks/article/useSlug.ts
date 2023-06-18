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
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState<SinglePostInterface[]>([]);
   const formattedSlug = slug?.split('_').join(' ');
   const location = useLocation();

   // getting single post
   const singlePost: any = posts.find(({ slug }: any) => slug === formattedSlug);

   const { userInfo } = useFetchUser();

   const [allComments, setAllComments] = useState<any>([]);
   const [comment, setComment] = useState('');
   const [updatedComments, setUpdatedComments] = useState<any>([]);
   const [showComment, setShowComment] = useState<boolean>(false);
   const [selectedComment, setSelectedComment] = useState<any>();
   const [commentSubmitted, setCommentSubmitted] = useState(false);

   //reply state
   const [reply, setReply] = useState('');
   const [showReplyInput, setShowReplyInput] = useState<string[]>([]);
   const [showReplyField, setShowReplyField] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [updatedRepliesWithComment, setUpdatedRepliesWithComment] = useState<any>([]);

   // state for likes
   const [commentLikes, setCommentLikes] = useState([]) as any;

   // state for reply likes
   const [replyLikes, setAllReplyLikes] = useState([]) as any;

   // console.log(allComments)

   // handle comment change
   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
   };

   // handle reply change
   const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReply(e.target.value);
   };

   // handle comment selected
   const handleCommentSelected = (comment: any) => {
      setSelectedComment(comment);
      // console.log(comment)
      // if user is logged in
      if (userInfo?.uid) {
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
      // if user is not logged in
      else {
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

   // toggle reply input
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
            replyLikes: [],
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
            commentLikes: [],
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

   // function to toggle comments
   const handleShowComment = () => {
      setShowComment(!showComment);
   };

   //handle comment like
   const handleCommentLiked = async (commentId: string) => {
      if (!userInfo?.uid) {
         toast.error('You need to login to like', {
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
      } else {
         try {
            const updatedComments = await Promise.all(
               //map through all comments and check if commentId matches with the commentId of the comment that is liked
               allComments.map(async (comment: any) => {
                  //if commentId matches then check if the user has already liked the comment
                  if (comment.commentId === commentId) {
                     const allLikes = comment?.commentLikes;
                     setCommentLikes(comment?.commentLikes);
                     const isLiked = allLikes?.includes(userInfo?.uid);
                     // if user has already liked the comment then remove the like
                     if (isLiked) {
                        const updatedCommentLikes = allLikes?.filter(
                           (like: string) => like !== userInfo.uid
                        );
                        setCommentLikes(updatedCommentLikes);
                        return {
                           ...comment,
                           commentLikes: updatedCommentLikes,
                        };
                     }
                     // if user has not liked the comment then add the like by adding the user id to the commentLikes array
                     else {
                        return {
                           ...comment,
                           commentLikes: [...allLikes, userInfo.uid],
                        };
                     }
                  } else {
                     return comment;
                  }
               })
            );
            setAllComments(updatedComments);
            //update the article with the updated comments
            await updateArticle(singlePost?.author?.uid, singlePost?.id, {
               comments: updatedComments,
            });
         } catch (err) {
            console.log(err);
         }
      }
   };

   // handle reply liked
   const handleReplyLiked = async (commentId: string, replyId: string) => {
      if (!userInfo?.uid) {
         toast.error('You need to login to like', {
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
      } else {
         try {
            //map through all comments and check if commentId matches with the commentId of the comment that is liked
            const updatedComments = await Promise.all(
               allComments.map(async (comment: any) => {
                  if (comment.commentId === commentId) {
                     const updatedReplies = await Promise.all(
                        //map through all replies and check if replyId matches with the replyId of the reply that is liked
                        comment.replies.map(async (reply: any) => {
                           if (reply.replyId === replyId) {
                              const replyLikes = reply?.replyLikes;
                              setAllReplyLikes(reply?.replyLikes);
                              const isLiked = replyLikes?.includes(userInfo?.uid);
                              // if user has already liked the reply then remove the like
                              if (isLiked) {
                                 const updatedReplyLikes = replyLikes?.filter(
                                    (like: string) => like !== userInfo.uid
                                 );
                                 return {
                                    ...reply,
                                    replyLikes: updatedReplyLikes,
                                 };
                              }
                              // if user has not liked the reply then add the like by adding the user id to the replyLikes array
                              else {
                                 return {
                                    ...reply,
                                    replyLikes: [...replyLikes, userInfo.uid],
                                 };
                              }
                           } else {
                              return reply;
                           }
                        })
                     );
                     return {
                        ...comment,
                        replies: updatedReplies,
                     };
                  } else {
                     return comment;
                  }
               })
            );
            //update the article with the updated comments
            setAllComments(updatedComments);
            //update the article with the updated comments
            await updateArticle(singlePost?.author?.uid, singlePost?.id, {
               comments: updatedComments,
            });
         } catch (err) {
            console.log(err);
         }
      }
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

   // return values
   return {
      singlePost,
      posts,
      loading,
      handleNavigate,
      allComments,
      comment,
      handleCommentSubmit,
      handleCommentChange,
      handleCommentLiked,
      commentLikes,
      updatedComments,
      showComment,
      handleShowComment,
      setSelectedComment,
      handleCommentSelected,
      selectedComment,
      isLoading,
      handlePageView,
      handleReplyChange,
      handleReplySubmit,
      handleReplyLiked,
      reply,
      replyLikes,
      showReplyInput,
      updatedRepliesWithComment,
      handleReplySelected,
      showReplyField,
   };
};
