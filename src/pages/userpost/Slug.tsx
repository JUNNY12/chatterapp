import { useParams } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaComment,
} from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';
import { MdLaoder } from './MdLoader';
import { SinglePageLoader } from '../../components/modules/skeletonloader/SinglePageLoader';
import { useFetchPost } from '../../hooks/article/useFetchPost';

export default function Slug(): React.JSX.Element {
    const { slug } = useParams();
    const { theme } = useThemeContext();
    const { posts, loading } = useFetchPost();
    console.log(slug);

    console.log(posts);

    const formattedSlug = slug?.split('_').join(' ');

    const singlePost = posts.find(({ slug }) => slug === formattedSlug);

    if (!singlePost) {
        return <SinglePageLoader />;
    }

    console.log(singlePost);
    const {
        title,
        coverImage,
        subtitle,
        tagList,
        author = {} as any,
        body,
        likeCount,
        views,
        comments,
    } = singlePost;

    return (
        <section className={` bg-white-100 h-max`}>
            {loading || posts.length === 0 ? (
                <SinglePageLoader />
            ) : (
                <div className={` ms-[250px] tabletS:ms-0 pt-24   `}>
                    <div
                        className={` border border-gray-300 flex laptopS:flex-col justify-between rounded-sm m-8 mb-8 tabletXS:m-3 tabletXS:mb-8 h-full transition duration-500 ease-in-out p-8 mobileXL:px-2 
                        ${
                            theme === 'lightMode'
                                ? 'bg-white-50 text-black-950'
                                : theme === 'darkMode' &&
                                  'bg-gray-800 text-white-100'
                        }
                        `}
                    >
                        <div>
                            <article className="me-8 laptopS:me-0">
                                <div className=" max-w-[600px] mb-4 h-[400px] tabletS:h-[300px] object-cover relative">
                                    <img
                                        src={coverImage}
                                        className=" object-cover h-full w-full"
                                        alt=""
                                    />
                                </div>
                                <Typography
                                    variant={1}
                                    className=" font-semibold text-3xl tabletXS:text-xl mb-3 max-w-[600px]"
                                >
                                    {title}.
                                </Typography>

                                <Typography
                                    variant={1}
                                    className=" font-normal text-xl tabletXS:text-lg mb-3 max-w-[600px]"
                                >
                                    {subtitle}.
                                </Typography>

                                <div>
                                    <MdLaoder content={body} />
                                </div>

                                <div className="flex flex-wrap items-center my-3">
                                    {tagList.map((tag, index) => (
                                        <div key={index} className="me-1">
                                            <span>#</span>
                                            <span className=" me-2 mb-2 text-sm font-semibold text-pink-600">
                                                {tag}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className=" flex items-center justify-center mt-12 text-xl">
                                    <div className=" flex items-center me-3">
                                        <FaComment className=" " />
                                        <Typography
                                            variant={2}
                                            className="text-base"
                                        >
                                            {comments.length}
                                        </Typography>
                                    </div>

                                    <div className=" flex items-center me-3">
                                        <MdFavorite className=" " />
                                        <Typography
                                            variant={2}
                                            className="text-base"
                                        >
                                            {likeCount}
                                        </Typography>
                                    </div>

                                    <div className=" flex items-center me-3">
                                        <MdInsights className=" " />
                                        <Typography
                                            variant={2}
                                            className="text-base"
                                        >
                                            {views}
                                        </Typography>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <aside
                            className=" border border-gray-300 w-[250px] laptopS:w-full laptopS:mt-8 
                    h-max rounded-sm"
                        >
                            <div>
                                <Typography
                                    variant={1}
                                    className="p-4 bg-gray-100 text-center font-semibold text-3xl mb-3 text-pink-600"
                                >
                                    Author
                                </Typography>
                            </div>

                            <div className=" flex items-center justify-center p-4 flex-wrap">
                                <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 border border-gray-300 relative rounded-full object-cover">
                                    <img
                                        src={author[0].data.photoUrl}
                                        alt="user"
                                        className=" rounded-full object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <Typography
                                        variant={1}
                                        className="font-bold text-xl mobileXL:text-lg text-center"
                                    >
                                        {author[0].data.fullName}
                                    </Typography>
                                </div>
                            </div>

                            <div>
                                <Typography
                                    variant={2}
                                    className="text-center text-xl font-bold"
                                >
                                    {author[0].data.occupation}
                                </Typography>
                            </div>

                            <div>
                                <p className="p-2 text-center">
                                    {author[0].data.bio}
                                </p>
                            </div>

                            <div>
                                <Typography
                                    variant={1}
                                    className="p-4 text-center font-semibold text-xl mb-3 text-pink-600"
                                >
                                    Share Article
                                </Typography>

                                <div className=" mb-4">
                                    <div className="flex justify-center items-center">
                                        <FaFacebook className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
                                        <FaTwitter className="text-3xl me-4 cursor-pointer hover:text-pink-600 " />
                                        <FaLinkedin className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
                                        <FaInstagram className="text-3xl me-4 cursor-pointer hover:text-pink-600" />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            )}
        </section>
    );
}
