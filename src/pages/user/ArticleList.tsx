import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { ArticleCard } from '.';

export const ArticleList = ({ article, user }: any) => {
   const { theme } = useThemeContext();

   return (
      <div>
         <div>
            {article?.length === 0 && (
               <div
                  className={` transition duration-500 ease-in-out ${
                     theme === 'lightMode'
                        ? 'bg-white-50 text-black-950'
                        : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                  }
                                    px-4 py-4 my-3 rounded-md`}
               >
                  <div className="flex items-center justify-center">
                     <Typography
                        variant={2}
                        className="my-2 text-xl font-semibold tabletS:text-center"
                     >
                        No Post Yet
                     </Typography>
                  </div>
               </div>
            )}
            {article?.map((post: SinglePostInterface) => {
               const { id } = post;
               return (
                  <ArticleCard
                     key={id}
                     post={post}
                     displayName={user?.displayName}
                     photoUrl={user?.photoUrl}
                     fullName={user?.fullName}
                     occupation={user?.occupation}
                  />
               );
            })}
         </div>
      </div>
   );
};
