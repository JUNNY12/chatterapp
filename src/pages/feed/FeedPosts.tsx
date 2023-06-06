import { Post } from './Post';
import { PostLoader } from '../../components/modules/skeletonloader';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { useFetchFeed } from '../../hooks/article/useFetchFeed';

export const FeedPosts = (): React.JSX.Element => {
    const { userFeed, loading } = useFetchFeed();

    return (
        <div>
            {(loading && userFeed.length === 0) ||
            (!loading && userFeed.length === 0) ? (
                <div>
                    {[...Array(5)].map((_, index) => (
                        <PostLoader key={index} />
                    ))}
                </div>
            ) : (
                <div>
                    {userFeed.map((post: SinglePostInterface) => {
                        const { id } = post;
                        return <Post key={id} post={post} />;
                    })}
                </div>
            )}
        </div>
    );
};
