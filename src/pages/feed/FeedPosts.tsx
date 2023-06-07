import { PostLoader } from '../../components/modules/skeletonloader';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { useFetchFeed } from '../../hooks/article/useFetchFeed';
import { PostCard } from '../../components/modules';

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
                        return (
                            <div key={id}>
                                <PostCard key={id} post={post} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
