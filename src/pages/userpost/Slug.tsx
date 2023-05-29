import { useParams } from 'react-router-dom';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { posts } from '../feed';
import { Typography, Button, Input } from '../../components/element';
import { Tags } from '../onboard';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaComment,
} from 'react-icons/fa';
import { MdFavorite, MdInsights } from 'react-icons/md';

export default function Slug(): React.JSX.Element {
    const { postId, userId } = useParams();
    const { theme } = useThemeContext();

    console.log(postId, userId);

    const singlePost = posts.find((post) => post.postId === Number(postId));

    console.log(singlePost);

    const date = new Date();
    const year = date.getFullYear();

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
                    <article className="me-8 laptopS:me-0">
                        <Typography
                            variant={1}
                            className=" font-semibold text-3xl tabletXS:text-xl mb-3 max-w-[600px]"
                        >
                            {singlePost?.title}.
                        </Typography>

                        <div className=" max-w-[600px] h-[400px] tabletS:h-[300px] object-cover relative">
                            <img
                                src="/images/post.jpg"
                                className=" object-cover h-full w-full"
                                alt=""
                            />
                        </div>

                        <p className="my-4 max-w-[600px] text-[16px] ">
                            {singlePost?.description}
                        </p>
                        <div className=" flex items-center justify-center mt-12 text-xl">
                            <div className=" flex items-center me-3">
                                <FaComment className=" " />
                                <Typography variant={2} className="text-base">
                                    {' '}
                                    10{' '}
                                </Typography>
                            </div>

                            <div className=" flex items-center me-3">
                                <MdFavorite className=" " />
                                <Typography variant={2} className="text-base">
                                    {' '}
                                    10{' '}
                                </Typography>
                            </div>

                            <div className=" flex items-center me-3">
                                <MdInsights className=" " />
                                <Typography variant={2} className="text-base">
                                    {' '}
                                    10{' '}
                                </Typography>
                            </div>
                        </div>
                    </article>

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

                        <div className=" flex items-center justify-center mb-3 p-4 flex-wrap">
                            <div className=" w-[100px] h-[100px] mobileXL:w-[50px] mobileXL:h-[50px] me-4 border border-gray-300 relative rounded-full object-cover">
                                <img
                                    src="/images/hero.svg"
                                    alt="user"
                                    className=" rounded-full object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <Typography
                                    variant={1}
                                    className="font-bold text-xl mobileXL:text-lg"
                                >
                                    John Doe
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center mt-4 p-4">
                            {Tags.slice(0, 4).map((tag) => {
                                return (
                                    <div className="p-2 cursor-pointer  text-white-50 mb-2 rounded-md bg-pink-600 max-w me-2">
                                        {tag}
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            <Typography
                                variant={1}
                                className="p-4 text-center font-semibold text-xl mb-3 text-pink-600"
                            >
                                Social Share
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
                <footer
                    className={`px-12 py-8 flex justify-center items-center flex-col transition duration-500 ease-in-out
        ${
            theme === 'lightMode'
                ? 'text-black-950 bg-white-50'
                : theme === 'darkMode' && ' text-white-100 bg-gray-900'
        }
        `}
                >
                    <div>
                        <Typography variant={4} className="mb-3 text-2xl">
                            Subsribe to our newsletter
                        </Typography>
                        <form action="" className="flex flex-col">
                            <Input
                                className=" w-[300px] bg-white-50 placeholder:text-black-900 rounded-sm mb-4 focus:border focus:border-pink-600"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <Button className="w-[300px] bg-pink-600 p-2  text-white-50 font-semibold rounded-sm">
                                Subscribe
                            </Button>
                        </form>
                    </div>

                    <div className="mt-6">
                        <Typography
                            variant={4}
                            className="mb-3 text-2xl text-center"
                        >
                            Follow us
                        </Typography>
                        <div className="flex justify-center items-center">
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="me-6"
                            >
                                <FaLinkedin className="text-3xl  hover:text-pink-600" />
                            </a>
                            <a
                                href="https://www.twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="me-6"
                            >
                                <FaTwitter className="text-3xl  hover:text-pink-600" />
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="me-6"
                            >
                                <FaFacebook className="text-3xl  hover:text-pink-600" />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="me-6"
                            >
                                <FaInstagram className="text-3xl  hover:text-pink-600" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 text-xl ">&copy; Chatter {year}</div>

                    <div className="text-4xl mt-6 font-semibold text-pink-600">
                        Chatter
                    </div>
                </footer>
            </div>
        </section>
    );
}
