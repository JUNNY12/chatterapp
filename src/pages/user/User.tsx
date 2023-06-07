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
import { useFetchUsers } from '../../hooks/user/useFetchUsers';
import { useParams } from 'react-router';
import { getUserArticles } from '../../firebase/article';
import { ArticleCard } from './ArticleCard';
import { SinglePostInterface } from '../../context/article/FetchAllPostContext';
import { getTimeDifferenceString } from '../../utils/getTimeDifference';
import { UserNotFound } from './UserNotFound';
import { UserPageLoader } from '../../components/modules/skeletonloader';

export default function User(): React.JSX.Element {
    const { theme } = useThemeContext();
    const { displayName } = useParams();
    const { allUsers, loading } = useFetchUsers();
    const [userArticles, setUserArticles] = useState([]) as any;
    const [isLoading, setIsLoading] = useState(false) as any;

    console.log(isLoading);
    const user = allUsers?.find(
        (user: any) => user.displayName === displayName
    );
    console.log(user);

    let uid = user?.uid;

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

    if (!user && !loading) {
        // User not found,
        return <UserNotFound />;
    }

    return (
        <>
            {isLoading ? (
                <UserPageLoader />
            ) : (
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
                            className={`
                    ${isLoading && 'animate-pulse'}
                    ${
                        theme === 'lightMode'
                            ? 'bg-white-50'
                            : theme === 'darkMode' && 'bg-pink-600'
                    }
                    absolute p-1 -bottom-[50px] left-[10px] w-[100px] h-[100px] object-cover rounded-full
                    transition duration-500 ease-in-out
                    `}
                        >
                            <img
                                src={user?.photoUrl}
                                className="rounded-full w-full h-full object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        className={` transition duration-500 ease-in-out ${
                            theme === 'lightMode'
                                ? 'bg-white-50 text-black-950'
                                : theme === 'darkMode' &&
                                  'bg-gray-800 text-white-100'
                        }
            pt-16 px-4 py-3 rounded-bl-md rounded-br-md`}
                    >
                        <div>
                            <Typography
                                variant={1}
                                className=" text-2xl font-bold"
                            >
                                {user?.fullName}
                            </Typography>

                            <Typography variant={2} className="my-2 text-base">
                                {user?.location}
                            </Typography>

                            <Typography
                                variant={2}
                                className="my-2 font-bold me-4 text-base"
                            >
                                @ {user?.displayName}
                            </Typography>

                            <Typography variant={2} className="my-2 text-base">
                                {user?.occupation}
                            </Typography>

                            <div className="my-3">
                                <p>{user?.bio}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={` transition duration-500 ease-in-out ${
                            theme === 'lightMode'
                                ? 'bg-white-50 text-black-950'
                                : theme === 'darkMode' &&
                                  'bg-gray-800 text-white-100'
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
                                href={user?.socialInfo?.twitter}
                                target="_blank"
                                title="twitter"
                            >
                                <FaTwitter className=" me-4 cursor-pointer" />
                            </a>

                            <a
                                href={user?.socialInfo?.facebook}
                                target="_blank"
                                title="facebook"
                            >
                                <FaFacebook className=" me-4 cursor-pointer" />
                            </a>

                            <a
                                href={user?.socialInfo?.linkedIn}
                                target="_blank"
                                title="linkedIn"
                            >
                                <FaLinkedinIn className=" me-4 cursor-pointer" />
                            </a>
                            <a
                                href={user?.socialInfo?.github}
                                title="github"
                                target="_blank"
                            >
                                <FaGithub className=" me-4 cursor-pointer" />
                            </a>
                            <a
                                href={user?.socialInfo?.instagram}
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
                                : theme === 'darkMode' &&
                                  'bg-gray-800 text-white-100'
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
                            {user?.tags.map((tag, index) => (
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
                                        displayName={user?.displayName}
                                        photoUrl={user?.photoUrl}
                                        fullName={user?.fullName}
                                        occupation={user?.occupation}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
