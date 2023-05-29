import { posts } from '../feed';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Post, Trending, Recent } from '.';

export const ExplorePosts = (): React.JSX.Element => {
    const { theme } = useThemeContext();

    return (
        <div
            className={` border border-gray-300 rounded-sm m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
             theme === 'lightMode'
                 ? 'bg-white-50 text-black-950'
                 : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
        >
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
