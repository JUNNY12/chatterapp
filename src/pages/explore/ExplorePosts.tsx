import { Trending, Recent } from '.';
import { PostCard } from '../../components/modules';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { PostLoader } from '../../components/modules/skeletonloader';

export const ExplorePosts = (): React.JSX.Element => {
    const { posts, loading } = useFetchPost();

    return (
        <div>
            <Trending />
            <Recent />

            <div>
                {(loading && posts.length === 0) ||
                (!loading && posts.length === 0) ? (
                    [...Array(10)].map((_, index) => <PostLoader key={index} />)
                ) : (
                    <div>
                        {posts.map((post: any) => {
                            const { id } = post;
                            return <PostCard key={id} post={post} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
