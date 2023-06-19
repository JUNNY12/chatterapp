import { Button, Typography } from '../../element';
import { FaCaretDown, FaCaretUp, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getUserDrafts } from '../../../firebase/article/getUserDrafts';
import { useFetchUser } from '../../../hooks/user/useFetchUser';
import { useNavigate } from 'react-router';
import { useArticleContext } from '../../../hooks/article/useArticleContext';

export const PostSideBar = () => {
   const [showDraft, setShowDraft] = useState(false);
   const [showPublished, setShowPublished] = useState(false);
   const [posts, setPosts] = useState([]) as any;
   const { userInfo } = useFetchUser();
   const { clearArticle } = useArticleContext();

   const navigate = useNavigate();

   const fetchUserArticles = async () => {
      try {
         const userDrafts = await getUserDrafts(userInfo?.uid);
         setPosts(userDrafts);
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      fetchUserArticles();
   }, [userInfo?.uid]);

   // console.log(posts);
   // console.log(posts?.length)

   const handleShowDraft = () => {
      setShowDraft(!showDraft);
   };

   const handleShowPublished = () => {
      setShowPublished(!showPublished);
   };

   const handleNewPost = () => {
      clearArticle();
      navigate('/write');
   };

   return (
      <div>
         <div>
            <Typography
               onClick={handleShowDraft}
               role="button"
               variant={2}
               className="mb-3 font-semibold text-xl flex cursor-pointer justify-between "
            >
               <span className="inline-block">Drafts</span>
               <span>
                  {!showDraft ? (
                     <FaCaretDown className="inline-block mb-2" />
                  ) : (
                     <FaCaretUp className="inline-block mb-2" />
                  )}
               </span>
            </Typography>
            {showDraft && (
               <ul className="font-normal text-lg">
                  {posts?.map((post: any) => {
                     console.log(post);
                     return (
                        <li
                           onClick={() => navigate(`edit/${post.id}`)}
                           className="mb-3 hover:text-pink-600 cursor-pointer"
                           key={post.id}
                        >
                           {post?.data?.title}
                           <FaTrash />
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>

         <div>
            <Typography
               onClick={handleShowPublished}
               role="button"
               variant={2}
               className="mb-3 font-semibold text-xl flex cursor-pointer justify-between"
            >
               <span className="inline-block">Published</span>
               <span>
                  {!showPublished ? (
                     <FaCaretDown className="inline-block mb-2" />
                  ) : (
                     <FaCaretUp className="inline-block mb-2" />
                  )}
               </span>
            </Typography>
            {showPublished && (
               <ul className={`font-normal text-lg `}>
                  <li className="mb-3">Post 1</li>
                  <li className="mb-3">Post 2</li>
               </ul>
            )}

            <div className=" absolute bottom-4  ">
               <Button
                  title="New post"
                  onClick={handleNewPost}
                  className="bg-pink-600 rounded-[40px] w-[120px] text-white-50 p-2"
               >
                  New post
               </Button>
            </div>
         </div>
      </div>
   );
};
