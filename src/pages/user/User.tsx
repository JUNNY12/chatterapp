import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { Typography } from '../../components/element';
import {
    FaTwitter,
    FaFacebook,
    FaLinkedinIn,
    FaGithub,
    FaInstagram,
} from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { useParams } from 'react-router';
import { getUserArticles } from '../../firebase/article';
import { ArticleCard } from './ArticleCard';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';

export default function User(): React.JSX.Element {
    const { theme } = useThemeContext();
    const { displayName } = useParams();
    const { allUsers } = useFetchUser();
    const [userArticles, setUserArticles] = useState([]) as any;
    const [isLoading, setIsLoading] = useState(false) as any;

    console.log(isLoading);
    const user = allUsers?.filter((user) => user.displayName === displayName);
    console.log(user[0]?.displayName);

    let uid = user[0]?.uid;

    const fetchUserArticles = async () => {
        setIsLoading(true);
        if (uid) {
            const userArticles = await getUserArticles(uid);

            const updatedPost = userArticles.map((post: any) => {
                console.log(post?.data?.createdAt);
                const createdDate = new Date(post?.data?.createdAt);
                const currentDate = new Date();
                const diff = currentDate.getTime() - createdDate.getTime();

                return {
                    ...post,
                    createdAgo: getTimeDifferenceString(diff),
                };
            });
            setUserArticles(updatedPost);
            setIsLoading(false);
        }
    };

    console.log(userArticles);

    useEffect(() => {
        fetchUserArticles();
    }, [uid]);

    return (
        <section
            className={` transition duration-500 mb-4 ease-in-out ${
                theme === 'lightMode'
                    ? ' text-black-950'
                    : theme === 'darkMode' && ''
            } `}
        >
            <div
                className={` h-[150px] w-full transition duration-500 ease-in-out relative
            ${
                theme === 'lightMode'
                    ? 'bg-gradient-to-tr from-pink-100 to-pink-600'
                    : theme === 'darkMode' &&
                      ' bg-gradient-to-tr from-white-100 to-gray-800'
            } rounded-tl-md rounded-tr-md`}
            >
                <div
                    className={`${
                        theme === 'lightMode'
                            ? 'bg-white-50'
                            : theme === 'darkMode' && 'bg-pink-600'
                    }
                    absolute p-1 -bottom-[50px] left-[10px] w-[100px] h-[100px] object-cover rounded-full
                    transition duration-500 ease-in-out
                    `}
                >
                    <img
                        src={user[0]?.photoUrl}
                        className="rounded-full w-full h-full object-cover"
                        alt=""
                    />
                </div>
            </div>
            <div
                className={` transition duration-500 ease-in-out ${
                    theme === 'lightMode'
                        ? 'bg-white-50 text-black-950'
                        : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                }
            pt-16 px-4 py-3 rounded-bl-md rounded-br-md`}
            >
                <div>
                    <Typography variant={1} className=" text-2xl font-bold">
                        {user[0]?.fullName}
                    </Typography>

                    <Typography variant={2} className="my-2 text-base">
                        {user[0]?.location}
                    </Typography>

                    <Typography
                        variant={2}
                        className="my-2 font-bold me-4 text-base"
                    >
                        @ {user[0]?.displayName}
                    </Typography>

                    <Typography variant={2} className="my-2 text-base">
                        {user[0]?.occupation}
                    </Typography>

                    <div className="my-3">
                        <p>{user[0]?.bio}</p>
                    </div>
                </div>
            </div>

            <div
                className={` transition duration-500 ease-in-out ${
                    theme === 'lightMode'
                        ? 'bg-white-50 text-black-950'
                        : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                }
             px-4 py-4 my-3 rounded-md`}
            >
                <Typography
                    variant={2}
                    className="my-2 text-xl font-semibold tabletS:text-center"
                >
                    Social Links
                </Typography>
                <div className=" flex items-center justify-center text-3xl mobileL:text-2xl">
                    <a
                        href={user[0]?.socialInfo?.twitter}
                        target="_blank"
                        title="twitter"
                    >
                        <FaTwitter className=" me-4 cursor-pointer" />
                    </a>

                    <a
                        href={user[0]?.socialInfo?.facebook}
                        target="_blank"
                        title="facebook"
                    >
                        <FaFacebook className=" me-4 cursor-pointer" />
                    </a>

                    <a
                        href={user[0]?.socialInfo?.linkedIn}
                        target="_blank"
                        title="linkedIn"
                    >
                        <FaLinkedinIn className=" me-4 cursor-pointer" />
                    </a>
                    <a
                        href={user[0]?.socialInfo?.github}
                        title="github"
                        target="_blank"
                    >
                        <FaGithub className=" me-4 cursor-pointer" />
                    </a>
                    <a
                        href={user[0]?.socialInfo?.instagram}
                        title="instagram"
                        target="_blank"
                    >
                        <FaInstagram className=" me-4 cursor-pointer" />
                    </a>
                    <a href="http://" title="website" target="_blank">
                        <TbWorldWww className=" me-4 cursor-pointer" />
                    </a>
                </div>
            </div>

            <div
                className={` transition duration-500 ease-in-out ${
                    theme === 'lightMode'
                        ? 'bg-white-50 text-black-950'
                        : theme === 'darkMode' && 'bg-gray-800 text-white-100'
                }
             px-4 py-4 my-3 rounded-md`}
            >
                <Typography
                    variant={2}
                    className="my-2 text-xl font-semibold tabletS:text-center"
                >
                    Interests
                </Typography>
                <div className=" flex flex-wrap mobileXL:justify-center ">
                    {user[0]?.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="me-2 mb-2 rounded-md cursor-pointer bg-pink-600 text-white-50"
                        >
                            <Typography
                                variant={2}
                                className="my-2 px-6  text-base"
                            >
                                {tag}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div>
                    {userArticles?.map((post: SinglePostInterface) => {
                        const { id } = post;
                        return (
                            <ArticleCard
                                key={id}
                                post={post}
                                displayName={user[0]?.displayName}
                                photoUrl={user[0]?.photoUrl}
                                fullName={user[0]?.fullName}
                                occupation={user[0]?.occupation}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
