import { Post, Trending, Recent } from '.';
import { useFetchPost } from '../../hooks/article/useFetchPost';


export const ExplorePosts = (): React.JSX.Element => {
    const { posts } = useFetchPost();
    return (
        <div>
            <Trending />
            <Recent />
            <div>
                {posts.map((post:any, index:number) => (
                    <Post key={index} post={post} />
                ))}
            </div>
        </div>
    );
};
