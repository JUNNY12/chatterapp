import { Button, Typography } from '../../element';
import { FaCaretDown, FaCaretUp, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getUserDrafts } from '../../../firebase/article/getUserDrafts';
import { useFetchUser } from '../../../hooks/user/useFetchUser';
import { useNavigate } from 'react-router';
import { useArticleContext } from '../../../hooks/article/useArticleContext';
import { deleteDraft } from '../../../firebase/article';
import { Modal } from '../../modal';
import { useLocation } from 'react-router';

export const PostSideBar = () => {
   const [showDraft, setShowDraft] = useState(false);
   const [posts, setPosts] = useState([]) as any;
   const { userInfo } = useFetchUser();
   const { clearArticle } = useArticleContext();
   const [isLoading, setIsLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [ID, setID] = useState('') as any;
   const { pathname } = useLocation();

   const navigate = useNavigate();

   // fetch user drafts
   const fetchUserDrafts = async () => {
      try {
         setIsLoading(true);
         if (userInfo.uid) {
            const userDrafts = await getUserDrafts(userInfo?.uid);
            setPosts(userDrafts);
         }
      } catch (e) {
         console.log(e);
      }
      setIsLoading(false);
   };

   //fetch user drafts based on user id and showDraft state
   useEffect(() => {
      fetchUserDrafts();
   }, [userInfo?.uid, showDraft]);

   //show drafts
   const handleShowDraft = () => {
      setShowDraft(!showDraft);
   };

   // navigate to write page
   const handleNewPost = () => {
      clearArticle();
      navigate('/write');
   };

   // delete draft
   const handleDelete = async (id: string) => {
      try {
         await deleteDraft(userInfo?.uid, id);

         //close modal
         setIsOpen(false);

         //fetch user drafts
         fetchUserDrafts();

         //clear article field
         clearArticle();

         //navigate to write page
         setTimeout(() => {
            navigate('/write');
         }, 2000);
      } catch (e) {
         console.log(e);
      }
   };

   //close modal
   const onClose = () => {
      setIsOpen(false);
   };

   const handleToggle = (ID: any) => {
      setIsOpen(!isOpen);
      //get id of the draft
      setID(ID);
   };

   return (
      <div>
         <div className="">
            <Modal
               isOpen={isOpen}
               onClose={onClose}
               onYes={() => handleDelete(ID)}
               onNo={() => setIsOpen(false)}
            >
               <p>Do you want to delete this Draft?</p>
            </Modal>
         </div>
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
               <div>
                  {isLoading && (
                     <div className="">
                        {[...Array(3)].map((_, index) => (
                           <div
                              key={index}
                              className="animate-pulse bg-gray-300 h-8 w-[150px] rounded-sm my-4"
                           />
                        ))}
                     </div>
                  )}
                  {!isLoading && posts?.length === 0 && (
                     <div className="flex justify-center items-center">
                        <Typography variant={1} className="text-lg">
                           No Draft yet
                        </Typography>
                     </div>
                  )}
                  <ul className="font-normal text-lg">
                     {!isLoading &&
                        posts?.map((post: any) => {
                           return (
                              <li key={post?.id}>
                                 <span
                                    onClick={() => navigate(`edit/${post.id}`)}
                                    className="mb-3 hover:text-pink-600 cursor-pointer"
                                 >
                                    {post?.data?.title?.substring(0, 20) + ' ... '}
                                 </span>
                                 <span
                                    onClick={() => handleToggle(post?.id)}
                                    className="toggle-button"
                                 >
                                    <FaTrash className="block my-2 hover:text-pink-600 cursor-pointer" />
                                 </span>
                              </li>
                           );
                        })}
                  </ul>
               </div>
            )}
         </div>

         <div>
            <div className=" absolute bottom-4  ">
               <Button
                  disabled={pathname === '/write'}
                  title="New post"
                  onClick={handleNewPost}
                  className={`bg-pink-600 rounded-[40px] w-[120px] text-white-50 p-2 ${
                     pathname === '/write' && 'cursor-not-allowed'
                  }`}
               >
                  New post
               </Button>
            </div>
         </div>
      </div>
   );
};
