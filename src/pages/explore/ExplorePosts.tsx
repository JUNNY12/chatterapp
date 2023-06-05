import { Post, Trending, Recent } from '.';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { PostLoader } from '../../components/modules/skeletonloader';

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
                        {posts.map((post: any) =>{
                            const {id}=post;
                            return <Post key={id} post={post} />;
                        }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
