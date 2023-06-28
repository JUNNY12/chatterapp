import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useParams } from 'react-router';
import { UserNotFound } from './UserNotFound';
import { UserPageLoader } from '../../components/modules/skeletonloader';
import { ArticleList, BioInfo, Interest, SocialLink, Header } from '.';
import { useFetchProfile } from '../../hooks/user/useFetchProfile';
import { MetaTag } from '../../components/metatag/MetaTag';

export default function User(): React.JSX.Element {
   const { theme } = useThemeContext();
   const { displayName } = useParams();
   const { user, loading, isLoading, userArticles } = useFetchProfile(displayName);

   if (!user && !loading) {
      return <UserNotFound />;
   }

   return (
      <>
         <MetaTag
            title={`Chatter`}
            ogTitle={`Chatter | ${user?.displayName}`}
            description={`View ${user?.displayName}'s profile`}
            image={user?.photoUrl}
            url={`/user/${user?.displayName}`}
            twitterTitle={`Chatter | ${user?.displayName}`}
            twitterDescription={`View ${user?.displayName}'s profile`}
            twitterImage={user?.photoUrl}
            twitterCard="summary_large_image"
            ogType="profile"
            href={`/user/${user?.displayName}`}
         />

         {isLoading ? (
            <UserPageLoader />
         ) : (
            <section
               className={` transition duration-500 mb-4 ease-in-out ${
                  theme === 'lightMode' ? ' text-black-950' : theme === 'darkMode' && ''
               } `}
            >
               <Header user={user} isLoading={isLoading} />
               <BioInfo user={user} />
               {user?.socialInfo && <SocialLink user={user} />}
               <Interest user={user} />
               <ArticleList article={userArticles} user={user} />
            </section>
         )}
      </>
   );
}
