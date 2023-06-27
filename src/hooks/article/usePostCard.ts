import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { updateArticle } from '../../firebase/article';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { toast } from 'react-toastify';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';

const usePostCard = (post: SinglePostInterface) => {
   const navigate = useNavigate();
   const { theme } = useThemeContext();
   const location = useLocation();

   //get userInfo from useFetchUser hook
   const { userInfo } = useFetchUser();

   // state for comment
   const [comment, setComment] = useState('');
   const [showComment, setShowComment] = useState(false);
   const [allComments, setAllComments] = useState(post?.comments);
   const [isLoading, setIsLoading] = useState(false);

   //state for bookmark
   const [bookmarks, setBookmarks] = useState<string[] | any>(post?.bookmarks);
   const [bookmarked, setBookmarked] = useState(false);

   // state for likes
   const [allLikes, setAllLikes] = useState(post?.likeCounts);
   const [liked, setLiked] = useState(false);

   useEffect(() => {
      setAllComments(post?.comments);
      setAllLikes(post?.likeCounts);
      setBookmarked(post?.bookmarks?.includes(userInfo?.uid as string));
      setLiked(post?.likeCounts?.includes(userInfo?.uid as string));
      setBookmarks(post?.bookmarks);
   }, [location]);

   // handle bookmark
   const handleBookmark = async () => {
      if (!userInfo?.uid) {
         toast.error('You need to login to bookmark', {
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
         const bookmarked = bookmarks?.includes(userInfo?.uid);
         if (bookmarked) {
            const updatedBookmarks = bookmarks.filter((id: any) => id !== userInfo.uid);
            await updateArticle(author?.uid, id, {
               bookmarks: updatedBookmarks,
            });
            setBookmarks(updatedBookmarks);
            setBookmarked(!bookmarked);
         } else {
            const updatedBookmarks = [...bookmarks, userInfo.uid];
            await updateArticle(author?.uid, id, {
               bookmarks: updatedBookmarks,
            });
            setBookmarks(updatedBookmarks);
            setBookmarked(!bookmarked);
         }
      }
   };

   // handle like
   const handleLike = async () => {
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
         const liked = allLikes?.includes(userInfo?.uid as string);

         if (liked) {
            const updatedLikeCounts = allLikes.filter((id) => id !== userInfo.uid);
            await updateArticle(author?.uid, id, {
               likeCounts: updatedLikeCounts,
            });
            setAllLikes(updatedLikeCounts);
            setLiked(!liked);
         } else {
            const updatedLikeCounts = [...allLikes, userInfo.uid as string];
            await updateArticle(author?.uid, id, {
               likeCounts: updatedLikeCounts,
            });
            setAllLikes(updatedLikeCounts);
            setLiked(!liked);
         }
      }
   };

   // handle comment input change
   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
   };

   // handle comment submit
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
         await updateArticle(author?.uid, id, {
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
         setShowComment(false);
         setIsLoading(false);
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

   const handleShowComment = () => {
      if (userInfo?.uid) {
         setShowComment(!showComment);
      } else {
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
         }, 3000);
      }
   };

   // handle navigate to single post
   const handleNavigate = () => {
      navigate(`/post/${fullName.split(' ').join('_')}/${slug.split(' ').join('_')}`);
   };

   // destructure post
   const {
      id,
      title,
      coverImage,
      subtitle,
      tagList,
      author = {} as any,
      createdAgo,
      slug,
      body,
      views,
      comments,
      likeCounts,
   } = post;

   // destructure author
   const { displayName, photoUrl, fullName, occupation, uid } = author;

   // return the values needed for the component
   return {
      theme,
      comment,
      showComment,
      setShowComment,
      allComments,
      isLoading,
      liked,
      handleLike,
      setAllLikes,
      allLikes,
      handleCommentChange,
      handleCommentSubmit,
      handleShowComment,
      handleNavigate,
      navigate,
      handleBookmark,
      bookmarked,
      id,
      title,
      subtitle,
      tagList,
      coverImage,
      createdAgo,
      author,
      body,
      views,
      comments,
      likeCounts,
      displayName,
      photoUrl,
      fullName,
      occupation,
      uid,
   };
};

export default usePostCard;
