import { Input, Typography, Button } from '../element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNav } from '../../hooks/nav/useNav';
import { DropNav } from '.';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../firebase/user';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { FaUserCircle } from 'react-icons/fa';

export const FeedNav = (): React.JSX.Element => {
    const { theme, toggleTheme } = useThemeContext();
    const { user } = useAuthContext();
    const { setShow } = useNav();
    const [showDrop, setShowDrop] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<any>({
        photoUrl: '',
        displayName: '',
    });

    let uid: any;

    //get user details
    useEffect(() => {
        if (user) {
            uid = user.uid;

            const getUserDetails = async () => {
                setLoading(true);
                const userData = await getUser(uid);
                setUserDetails({
                    ...userDetails,
                    photoUrl: userData[0].data.photoUrl,
                    displayName: userData[0].data.displayName,
                });
                setLoading(false);
            };
            getUserDetails();
        }
    }, [user]);

    //destructure user details
    const { photoUrl, displayName } = userDetails;

    //show side bar
    const handleShow = () => {
        setShow((prev) => !prev);
    };

    // show drop nav
    const handleClick = () => {
        setShowDrop((prev) => !prev);
    };

    return (
        <div
            className={`
        ${
            theme === 'lightMode'
                ? 'bg-white-50 text-black-950'
                : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }
        fixed w-full items-center flex justify-between z-40 p-6 mobileL:px-2 transition duration-500 ease-in-out`}
        >
            <div
                className={`absolute right-2 shadow-sm shadow-black-600  bg-white-50 z-10 top-24`}
            >
                {showDrop && <DropNav handleClick={handleClick} />}
            </div>

            <div className=" hidden tabletS:flex">
                <Button
                    onClick={handleShow}
                    title="open"
                    className="text-3xl font-bold"
                >
                    <AiOutlineMenu />
                </Button>
            </div>
            <Typography
                variant={1}
                className=" text-3xl font-bold text-pink-600"
            >
                <Link to={`/`}> Chatter</Link>
            </Typography>

            <div className=" tabletXS:hidden">
                <Input
                    placeholder="Search chatter"
                    className="bg-white-100 txt-black-950 w-[300px] rounded-sm p-2"
                />
            </div>

            <div className=" flex items-center">
                <div className="me-4">
                    <Button
                        onClick={toggleTheme}
                        title="change theme"
                        className="text-2xl mobileL:text-xl"
                    >
                        {theme === 'lightMode' ? <FaMoon /> : <FaSun />}
                    </Button>
                </div>

                <div>
                    {user ? (
                        <div>
                            {loading ? (
                                <div className=" relative w-12  animate-pulse h-12 bg-gray-300 object-cover rounded-full me-3"></div>
                            ) : (
                                <div
                                    onClick={handleClick}
                                    className=" relative w-12 h-12 cursor-pointer object-cover rounded-full me-3"
                                >
                                    <img
                                        title="profile picture"
                                        className="rounded-full object-cover w-full h-full"
                                        src={photoUrl}
                                        alt={displayName}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            title="profile"
                            className="text-5xl tabletXS:text-3xl"
                            onClick={handleClick}
                        >
                            <FaUserCircle />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
