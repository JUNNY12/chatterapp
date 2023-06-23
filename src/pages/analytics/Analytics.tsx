import { Highlights } from './Highlights';
import { useAnalytics } from '../../hooks/analytics/useAnalytics';
import { Typography } from '../../components/element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function Analytics(): React.JSX.Element {
   const { highestViewedLikedAndCommentedPost, loading } = useAnalytics();
   const { theme } = useThemeContext();

   return (
      <>
         <MetaTag
            title="Chatter | Analytics"
            ogTitle="Share your creativity with the world"
            description="Analytics of your posts"
            image={chatterImgUrl}
            url="/analytics"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Analytics of your posts"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/analytics"
         />
         <section className={`bg-white-100`}>
            <div className={`ms-[250px] tabletS:ms-0 pt-24`}>
               <div>
                  {!loading && highestViewedLikedAndCommentedPost === null ? (
                     <div className={`flex justify-center items-center h-[75vh]`}>
                        <div
                           className={`rounded-md w-[500px] tabletS:w-[300px] mobileL:[280px] h-[200px] transition duration-500 ease-in-out
                                flex justify-center items-center  shadow-md shadow-black-700
                                      ${
                                         theme === 'lightMode'
                                            ? 'bg-white-50 text-black-950'
                                            : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                                      }
        `}
                        >
                           <Typography variant={1} className={`text-2xl font-bold`}>
                              No Posts Yet
                           </Typography>
                        </div>
                     </div>
                  ) : (
                     <Highlights />
                  )}
               </div>
            </div>
         </section>
      </>
   );
}
