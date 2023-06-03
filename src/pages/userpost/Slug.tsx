import { useParams } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';
import { Tags } from '../onboard';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaComment,
} from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getAllArticle } from '../../firebase/article';
import { DocumentData } from '@firebase/firestore-types';
import { MdLaoder } from './MdLoader';

export default function Slug(): React.JSX.Element {
    const { fullName, slug } = useParams();
    const { theme } = useThemeContext();

    // const formattedSlug = slug?.split('-').join(' ');
    // const formattedFullName = fullName?.split('-').join(' ');

    const [posts, setPosts] = useState<DocumentData>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosts = async () => {
        setLoading(true);
        const { articles } = await getAllArticle();
        setPosts(articles);
        setLoading(false);
    };
  

    const singlePost = posts.find(
        (post: DocumentData) =>
            post.slug === slug &&
            post.author.fullName === fullName
    );

    console.log(singlePost);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className={` bg-white-100 h-max`}>
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
                                    src={singlePost?.coverImage}
                                    className=" object-cover h-full w-full"
                                    alt=""
                                />
                            </div>
                            <Typography
                                variant={1}
                                className=" font-semibold text-3xl tabletXS:text-xl mb-3 max-w-[600px]"
                            >
                                {singlePost?.title}.
                            </Typography>

                            <Typography
                                variant={1}
                                className=" font-normal text-xl tabletXS:text-lg mb-3 max-w-[600px]"
                            >
                                {singlePost?.subtitle}.
                            </Typography>

                            <div>
                                <MdLaoder content={singlePost?.body} />
                            </div>
                            <div className=" flex items-center justify-center mt-12 text-xl">
                                <div className=" flex items-center me-3">
                                    <FaComment className=" " />
                                    <Typography
                                        variant={2}
                                        className="text-base"
                                    >
                                        {' '}
                                        10{' '}
                                    </Typography>
                                </div>

                                <div className=" flex items-center me-3">
                                    <MdFavorite className=" " />
                                    <Typography
                                        variant={2}
                                        className="text-base"
                                    >
                                        {' '}
                                        10{' '}
                                    </Typography>
                                </div>

                                <div className=" flex items-center me-3">
                                    <MdInsights className=" " />
                                    <Typography
                                        variant={2}
                                        className="text-base"
                                    >
                                        {' '}
                                        10{' '}
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
                                    src={singlePost?.author.photoUrl}
                                    alt="user"
                                    className=" rounded-full object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <Typography
                                    variant={1}
                                    className="font-bold text-xl mobileXL:text-lg text-center"
                                >
                                    {singlePost?.author.fullName}
                                </Typography>
                            </div>
                        </div>

                       <div>
                        <Typography variant={2} className='text-center text-xl font-bold'>
                            {singlePost?.author.occupation}
                        </Typography>
                       </div>

                       <div>
                        <p className='p-2 text-center'>
                            {singlePost?.author.bio}
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
        </section>
    );
}
