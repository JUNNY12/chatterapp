import { useParams } from "react-router";
import { useThemeContext } from "../../../hooks/theme/useThemeContext";
import { MdLaoder } from "../../userpost/MdLoader";
import { Typography } from "../../../components/element";
import { getUserArticles } from "../../../firebase/article";
import {useState, useEffect} from 'react';
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

export default function PreviewSlug(): React.JSX.Element {
    const { slug } = useParams();
    const { theme } = useThemeContext();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();

   const fetchUserArticles = async () => {
        try {
           if(user){
            setLoading(true);
            const userArticles = await getUserArticles(user?.uid);
            setPosts(userArticles);
            setLoading(false);
           }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchUserArticles();
    }, [user]);

    console.log(posts);

    const formattedSlug = slug?.split('_').join(' ');

    const singlePost = posts.find(({ slug }) => slug === formattedSlug);

    if (!singlePost) {
        return <div>Laading</div>;
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

    console.log(title)

    return (
        <section className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${theme === 'lightMode'
                ? 'bg-white-50 text-black-950'
                : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}>
            <h1>{slug}</h1>
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
        </section>
    )
}

