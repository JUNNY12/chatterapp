import { Input, Typography, Button } from '../element';
import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNav } from '../../hooks/nav/useNav';
import { DropNav } from '.';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const FeedNav = (): React.JSX.Element => {
    const { theme, toggleTheme } = useThemeContext();
    const { setShow } = useNav();
    const [showDrop, setShowDrop] = useState(false);

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

                <div
                    title="profile"
                    onClick={handleClick}
                    className=" h-10 w-10 mobileL:h-8 mobileL:w-8 cursor-pointer"
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/55974257?v=4"
                        alt="profile"
                        className="h-full w-full object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
