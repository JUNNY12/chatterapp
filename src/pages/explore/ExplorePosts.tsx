import { Post, Trending, Recent } from '.';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { PostLoader } from '../../components/modules/skeletonloader/PostLoader';

export const ExplorePosts = (): React.JSX.Element => {
    const { posts, loading } = useFetchPost();

    return (
        <div>
            <Trending />
            <Recent />

            <div>
                {loading || posts.length === 0 ? (
                    [...Array(10)].map((_, index) => <PostLoader key={index} />)
                ) : (
                    <div>
                        {posts.map((post: any, index: number) => (
                            <Post key={index} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
