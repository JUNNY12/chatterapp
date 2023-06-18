import React from 'react';
import { Typography } from '../../components/element';
// import { FaComment } from 'react-icons/fa';
// import { MdInsights } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { calculateReadingTime } from '../../utils';
// import { useAuthContext } from '../../hooks/auth/useAuthContext';
// import { updateArticle } from '../../firebase/article';

export const ArticleCard = ({
   post,
   displayName,
   photoUrl,
   fullName,
   occupation,
}: any): React.JSX.Element => {
   const navigate = useNavigate();
   const { theme } = useThemeContext();
   // const { user } = useAuthContext();

   const handleNavigate = () => {
      // await updateArticle(author[0].data.uid, id, { views: views + 1 });
      navigate(`/post/${fullName.split(' ').join('_')}/${post?.data?.slug.split(' ').join('_')}`);
   };

   return (
      <div
         className={`rounded-md h-full transition duration-500 ease-in-out 
         ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
      >
         <article className="border-b border-gray-300 p-8 my-8 tabletXS:my-3 mobileXL:px-2 cursor-pointer">
            <div
               onClick={() => navigate(`/user/${displayName}`)}
               className=" flex items-center mb-3"
            >
               <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 relative rounded-full object-cover">
                  <img
                     src={photoUrl}
                     title={displayName}
                     alt={displayName}
                     className=" rounded-full object-cover w-full h-full"
                  />
               </div>
               <div>
                  <Typography variant={1} className="font-bold text-2xl mobileXL:text-lg">
                     {fullName}
                  </Typography>
                  <Typography
                     variant={2}
                     className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                  >
                     <span> {occupation} </span>
                     <span className=" ms-6 mobileXL:ms-3">{post?.data?.createdAgo}</span>
                  </Typography>
               </div>
            </div>

            <div onClick={handleNavigate}>
               <Typography variant={1} className=" text-3xl mobileXL:text-xl font-bold mb-2">
                  {post?.data?.title}
               </Typography>

               <Typography variant={2} className=" text-2xl mobileXL:text-lg font-normal mb-2">
                  {post?.data?.subtitle.substring(0, 75) + ' ... '}
               </Typography>

               <Typography variant={2} className="font-semibold mb-1">
                  {calculateReadingTime(post?.data?.body)} mins read
               </Typography>

               <div className="flex flex-wrap items-center my-3">
                  {post?.data?.tagList.map((tag: string, index: number) => (
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

               {post?.data?.coverImage && (
                  <div className=" relative object-cover max-w-[600px] h-[300px] my-3">
                     <img
                        src={post?.data?.coverImage}
                        alt={post?.data?.title}
                        className=" object-cover h-full w-full"
                     />
                  </div>
               )}
            </div>

            {/* <div className=" flex items-center justify-center mt-12 text-xl">
               <div className=" flex items-center me-6">
                  <FaComment className=" " />
                  <Typography variant={2} className="text-base">
                     {post?.data?.comments.length}
                  </Typography>
               </div>

               <div className={`${likeCounts?.includes(userUID) && 'text-pink-600'} flex items-center me-6`} onClick={handleLike}>
                        <MdFavorite className={` `} />
                        <Typography variant={2} className="text-base">
                            {likeCounts?.length}
                        </Typography>
                    </div>

               <div className=" flex items-center me-6">
                  <MdInsights className=" " />
                  <Typography variant={2} className="text-base">
                     {post?.data?.views}
                  </Typography>
               </div>
            </div> */}
         </article>
      </div>
   );
};
