import { Post } from './Post';
import { PostLoader } from '../../components/modules/skeletonloader/PostLoader';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';

export const FeedPosts = (): React.JSX.Element => {
    const { posts, loading } = useFetchPost();

    return (
        <div>
            {loading || posts.length === 0 ? (
                <div>
                    {[...Array(5)].map((_, index) => (
                        <PostLoader key={index} />
                    ))}
                </div>
            ) : (
                <div>
                    {posts.map((post: SinglePostInterface, index: number) => {
                        return <Post key={index} post={post} />;
                    })}
                </div>
            )}
        </div>
    );
};
