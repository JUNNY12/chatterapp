import { Typography } from '../../../components/element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { FaTrash } from 'react-icons/fa';
import { getUserArticles } from '../../../firebase/article';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useState, useEffect } from 'react';

export default function Post(): React.JSX.Element {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserArticles = async () => {
        try {
            setLoading(true);
            const userArticles = await getUserArticles(user?.uid);
            setPosts(userArticles);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchUserArticles();
    }, []);

    console.log(posts);

    return (
        <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
                theme === 'lightMode'
                    ? 'bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
        >
            <div>
                <div className=" border-b border-gray-300 mb-4 ">
                    <Typography
                        variant={1}
                        className="font-bold text-2xl mobileXL:text-lg p-4"
                    >
                        My Posts
                    </Typography>
                </div>

                {
                    posts.length === 0 && !loading ?
                        <div className="flex justify-center items-center">
                            <Typography variant={1} className="text-lg">
                                No posts yet
                            </Typography>
                        </div>
                    
                    :
                            <div>
                                <div className="flex items-center font-semibold">
                                    <div className="me-3 w-[50%]">Posts</div>
                                    <div className="me-3  w-[30%]">Date</div>
                                    <div className="me-3 w-[20%]">Actions</div>
                                </div>
                                {/* display loading animation when fechting post */}
                                {loading ? (
                                    [...Array(5)].map((_, index) => {
                                        return (
                                            <div
                                                className="flex items-center mt-8"
                                                key={index}
                                            >
                                                <div className="me-3 w-[50%] h-8 bg-gray-300 animate-pulse">
                                                    {' '}
                                                </div>
                                                <div className="me-3  w-[30%] h-8  bg-gray-300 animate-pulse"></div>
                                                <div className="me-3 w-[20%] h-8 bg-gray-300 animate-pulse"></div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>
                                        {posts.map((post) => {
                                            const { id, data } = post;
                                            const { title } = data;
                                            return (
                                                <div
                                                    key={id}
                                                    className="flex items-center mt-8"
                                                >
                                                    <div className="me-3 w-[50%]">
                                                        {title}
                                                    </div>
                                                    <div className="me-3  w-[30%]">
                                                        May 25, 2023
                                                    </div>
                                                    <div
                                                        className="me-3 w-[20%] text-red-600 cursor-pointer"
                                                        title="delete post"
                                                        role="button"
                                                    >
                                                        <FaTrash />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>   
                }
            </div>
        </div>
    );
}
