import { posts } from './FeedPosts';
import { Typography } from '../../components/element';

export const Trending = (): React.JSX.Element => {
    return (
        <section className=" mt-12">
            <Typography variant={1} className="text-3xl font-bold mb-3">
                Trending Posts
            </Typography>
            <div>
                <ul>
                    {posts.slice(0, 5).map((post) => {
                        const { id, title } = post;
                        return (
                            <li key={id} className=" mb-3">
                                <Typography
                                    variant={1}
                                    className="text-lg font-bold mb-3"
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    variant={2}
                                    className="text-sm font-bold mb-3 text-pink-600"
                                >
                                    Read More ...
                                </Typography>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
