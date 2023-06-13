import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useParams } from 'react-router';
import { UserNotFound } from './UserNotFound';
import { UserPageLoader } from '../../components/modules/skeletonloader';
import { ArticleList, BioInfo, Interest, SocialLink, Header } from '.';
import { useFetchProfile } from '../../hooks/user/useFetchProfile';

export default function User(): React.JSX.Element {
    const { theme } = useThemeContext();
    const { displayName } = useParams();
    const { user, loading, isLoading, userArticles } =
        useFetchProfile(displayName);

    if (!user && !loading) {
        // User not found,
        return <UserNotFound />;
    }

    return (
        <>
            {isLoading ? (
                <UserPageLoader />
            ) : (
                <section
                    className={` transition duration-500 mb-4 ease-in-out ${
                        theme === 'lightMode'
                            ? ' text-black-950'
                            : theme === 'darkMode' && ''
                    } `}
                >
                    <Header user={user} isLoading={isLoading} />
                    <BioInfo user={user} />
                    <SocialLink user={user} />
                    <Interest user={user} />
                    <ArticleList article={userArticles} user={user} />
                </section>
            )}
        </>
    );
}
