import { posts } from '../feed';
import { Post, Trending, Recent } from '.';

export const ExplorePosts = (): React.JSX.Element => {
    return (
        <div>
            <Trending />
            <Recent />
            <div>
                {posts.map((post) => {
                    const { id, title, description, datePosted } = post;
                    return (
                        <Post
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            datePosted={datePosted}
                        />
                    );
                })}
            </div>
        </div>
    );
};
