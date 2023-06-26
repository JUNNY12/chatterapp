import { Button, Typography } from '../../../components/element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { FaTrash, FaEye } from 'react-icons/fa';
import { getUserArticles } from '../../../firebase/article';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/formatDate';
import { useNavigate } from 'react-router';
import { deleteArticle } from '../../../firebase/article';
import { Modal } from '../../../components/modal';
import { MetaTag } from '../../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../../config/constants/url';

export default function Post(): React.JSX.Element {
   const { theme } = useThemeContext();
   const { user } = useAuthContext();
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [ID, setID] = useState('') as any;

   const navigate = useNavigate();

   // open modal
   const onClose = () => {
      setIsOpen(false);
   };

   const handleToggle = (ID: any) => {
      setIsOpen(!isOpen);
      //get id of the draft
      setID(ID);
   };

   // fetch user articles
   const fetchUserArticles = async () => {
      try {
         setLoading(true);
         const userArticles = await getUserArticles(user?.uid);
         setPosts(userArticles);
         setLoading(false);
      } catch (e) {
         console.log(e);
      }
   };

   // handle delete article
   const handleDelete = async (id: string) => {
      try {
         await deleteArticle(user?.uid, id);
         fetchUserArticles();
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      fetchUserArticles();
   }, []);

   return (
      <>
         <MetaTag
            title="Chatter "
            ogTitle="Manage your Posts"
            description="Manage your posts on our inclusive platform. Post diverse content, connect with like-minded individuals"
            image={chatterImgUrl}
            url="/settings/post"
            twitterTitle="Manage your Posts"
            twitterDescription="Manage your posts on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/settings/post"
         />
         <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
               theme === 'lightMode'
                  ? 'bg-white-50 text-black-950'
                  : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
         >
            <div>
               <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  onYes={() => handleDelete(ID)}
                  onNo={() => setIsOpen(false)}
               >
                  <p>Do you want to delete this Post?</p>
               </Modal>
            </div>
            <div>
               <div className=" border-b border-gray-300 mb-4 ">
                  <Typography variant={1} className="font-bold text-2xl mobileXL:text-lg p-4">
                     My Posts
                  </Typography>
               </div>

               {posts.length === 0 && !loading ? (
                  <div className="flex justify-center items-center">
                     <Typography variant={1} className="text-lg">
                        No posts yet
                     </Typography>
                  </div>
               ) : (
                  <div>
                     <div className="flex items-center font-semibold">
                        <div className="me-3 w-[50%]">Posts</div>
                        <div className="me-3  w-[30%]">Date</div>
                        <div className="me-3 w-[20%]">Actions</div>
                     </div>
                     {/* display loading animation when fechting post */}
                     {loading ? (
                        [...Array(5)].map((_, index) => {
                           return (
                              <div className="flex items-center mt-8" key={index}>
                                 <div className="me-3 w-[50%] h-8 bg-gray-300 animate-pulse"> </div>
                                 <div className="me-3  w-[30%] h-8  bg-gray-300 animate-pulse"></div>
                                 <div className="me-3 w-[20%] h-8 bg-gray-300 animate-pulse"></div>
                              </div>
                           );
                        })
                     ) : (
                        // display user posts
                        <div>
                           {posts.map(
                              (post: {
                                 id: string;
                                 data: {
                                    title: string;
                                    createdAt: string;
                                    slug: string;
                                 };
                              }) => {
                                 const { id, data } = post;
                                 const { title, createdAt, slug } = data;

                                 return (
                                    <div key={id} className="flex items-center mt-8">
                                       <div className="me-3 w-[50%]">{title}</div>
                                       <div className="me-3 w-[30%]">{formatDate(createdAt)}</div>
                                       <div className="me-3 w-[20%] inline-flex items-center">
                                          <Button
                                             onClick={() => handleToggle(id)}
                                             title="delete post"
                                             role="button"
                                             className="text-red-600 cursor-pointer toggle-button"
                                          >
                                             <FaTrash />
                                          </Button>
                                          <Button
                                             onClick={() =>
                                                navigate(`/preview/${slug.split(' ').join('_')}`)
                                             }
                                             title="Preview post"
                                             role="button"
                                             className="text-green-600 cursor-pointer"
                                          >
                                             <FaEye className="ms-2" />
                                          </Button>
                                       </div>
                                    </div>
                                 );
                              }
                           )}
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
