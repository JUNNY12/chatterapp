import { posts } from '../feed';
import { Post } from '.';

export const FeaturedPosts = (): React.JSX.Element => {
    return (
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
    );
};
