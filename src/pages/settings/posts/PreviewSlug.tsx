import { useParams } from 'react-router';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { MdLaoder } from '../../slug/MdLoader';
import { Typography } from '../../../components/element';
import { getUserArticles } from '../../../firebase/article';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { MdInsights, MdFavorite } from 'react-icons/md';
import { FaComment } from 'react-icons/fa';
import { PreviewPostLoader } from '../../../components/modules/skeletonloader';

export default function PreviewSlug(): React.JSX.Element {
   const { slug } = useParams();
   const { theme } = useThemeContext();
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const { user } = useAuthContext();

   const fetchUserArticles = async () => {
      try {
         if (user) {
            setLoading(true);
            const userArticles = await getUserArticles(user?.uid);
            setPosts(userArticles);
            setLoading(false);
         }
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      fetchUserArticles();
   }, [user]);

   const formattedSlug = slug?.split('_').join(' ');
   console.log(formattedSlug);

   const singlePost = posts.find(
      (post: { id: string; data: { title: string; createdAt: string; slug: string } }) => {
         const { data } = post;
         const { slug } = data;
         return slug === formattedSlug;
      }
   );

   if (!singlePost) {
      return <PreviewPostLoader />;
   }

   const {
      data: {
         title,
         subtitle,
         body,
         tagList = [] as any,
         coverImage,
         comments = [] as any,
         likeCounts = [] as any,
         views,
      },
   } = singlePost;

   return (
      <section
         className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
            theme === 'lightMode'
               ? 'bg-white-50 text-black-950'
               : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         } `}
      >
         <div>
            {loading && posts.length === 0 ? (
               <PreviewPostLoader />
            ) : (
               <article className="me-8 laptopS:me-0">
                  {coverImage && (
                     <div className=" max-w-[600px] mb-4 h-[400px] tabletS:h-[300px] object-cover relative">
                        <img src={coverImage} className=" object-cover h-full w-full" alt="" />
                     </div>
                  )}
                  <Typography
                     variant={1}
                     className=" font-semibold text-3xl tabletXS:text-xl mb-3 max-w-[600px]"
                  >
                     {title}.
                  </Typography>

                  <Typography
                     variant={1}
                     className=" font-normal text-xl tabletXS:text-lg mb-3 max-w-[600px]"
                  >
                     {subtitle}.
                  </Typography>

                  <div>
                     <MdLaoder content={body} />
                  </div>

                  <div className="flex flex-wrap items-center max-w-[600px] my-3">
                     {tagList.map((tag: string, index: number) => (
                        <div key={index} className="me-1">
                           <span>#</span>
                           <span className=" me-2 mb-2 text-sm font-semibold text-pink-600">
                              {tag}
                           </span>
                        </div>
                     ))}
                  </div>

                  <div className=" flex items-center justify-center mt-12 text-xl">
                     <div className=" flex items-center me-3">
                        <FaComment className=" me-1" />
                        <Typography variant={2} className="text-base">
                           {comments.length}
                        </Typography>
                     </div>

                     <div className=" flex items-center me-3">
                        <MdFavorite className="me-1 " />
                        <Typography variant={2} className="text-base">
                           {likeCounts.length}
                        </Typography>
                     </div>

                     <div className=" flex items-center me-3">
                        <MdInsights className="me-1 " />
                        <Typography variant={2} className="text-base">
                           {views}
                        </Typography>
                     </div>
                  </div>
               </article>
            )}
         </div>
      </section>
   );
}
