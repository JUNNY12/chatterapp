import { Typography } from '../../components/element';
import { useNavigate } from 'react-router';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useFetchPost } from '../../hooks/article/useFetchPost';
import { calculateReadingTime } from '../../utils';
import { RecentPostLoader } from '../../components/modules/skeletonloader/RecentPostLoader';

export const Recent = (): React.JSX.Element => {
    const { theme } = useThemeContext();
    const { loading, posts } = useFetchPost();

    const navigate = useNavigate();

    console.log(posts, loading);

    return (
        <section
            className={`rounded-md m-8 tabletXS:m-3 h-full transition duration-500 ease-in-out 
         ${
             theme === 'lightMode'
                 ? 'bg-white-50 text-black-950'
                 : theme === 'darkMode' && 'bg-gray-800 text-white-100'
         }
        `}
        >
            <Typography
                variant={1}
                className="text-3xl font-bold mb-3 px-8 pt-8 mobileXL:px-2 "
            >
                Recent
            </Typography>
            <div>
                {loading || posts.length === 0 ? (
                    [...Array(6)].map((_, index) => (
                        <RecentPostLoader key={index} />
                    ))
                ) : (
                    <div>
                        {posts.slice(0, 6).map((post, index) => {
                            const {
                                title,
                                subtitle,
                                author = {} as any,
                                createdAgo,
                                body,
                                slug,
                                tagList,
                            } = post;
                            const readingTime = calculateReadingTime(body);
                            return (
                                <article
                                    key={index}
                                    className="border-b cursor-pointer border-gray-300 p-8 mobileXL:px-2"
                                >
                                    <div className=" flex items-center mb-3">
                                        <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 border border-gray-300 relative rounded-full object-cover">
                                            <img
                                                src={author[0].data.photoUrl}
                                                title={
                                                    author[0].data.displayName
                                                }
                                                alt={author[0].data.displayName}
                                                className=" rounded-full object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <Typography
                                                variant={1}
                                                className="font-bold text-2xl mobileXL:text-lg"
                                            >
                                                {author[0].data.fullName}
                                            </Typography>
                                            <Typography
                                                variant={2}
                                                className=" font-semibold mobileXL:text-[12px] inline-flex flex-wrap"
                                            >
                                                <span>
                                                    {' '}
                                                    {author[0].data.occupation}
                                                </span>
                                                <span className=" ms-6 mobileXL:ms-3">
                                                    {createdAgo}
                                                </span>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => {
                                            navigate(
                                                `/post/${author[0].data.fullName
                                                    .split(' ')
                                                    .join('_')}/${slug
                                                    .split(' ')
                                                    .join('_')}`
                                            );
                                        }}
                                        className=" mb-3"
                                    >
                                        <Typography
                                            variant={1}
                                            className=" text-3xl mobileXL:text-xl font-bold mb-2"
                                        >
                                            {title}
                                        </Typography>
                                        <p className=" max-w-[600px] text-2xl mobileXL:text-lg font-normal">
                                            {subtitle}
                                        </p>
                                        <Typography
                                            variant={2}
                                            className="font-semibold my-3"
                                        >
                                            {readingTime} mins read
                                        </Typography>
                                        <div className="flex flex-wrap items-center my-3">
                                            {tagList.map((tag, index) => (
                                                <div
                                                    key={index}
                                                    className="me-2"
                                                >
                                                    <span>#</span>
                                                    <span className=" text-sm font-semibold text-pink-600">
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Typography
                                            variant={2}
                                            className="text-sm font-bold mb-3 text-pink-600"
                                        >
                                            Read More ...
                                        </Typography>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
