'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Typography, Button } from '../element';
import { FaUserCircle, FaPen, FaMoon, FaSun } from 'react-icons/fa';
import { DropNav } from './dropNav/DropNav';
import { useWidth } from '../../hooks';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../hooks/navigation/useNavigation';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Navbar = (): React.JSX.Element => {
    const [show, setShow] = useState(false);
    const width = useWidth();
    const { theme, toggleTheme } = useThemeContext();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCloseMenu = () => {
        setShow(false);
    };

    const handleClick = () => {
        setShow((prev) => !prev);
    };
    //close dropdown when path changes
    useNavigation({ onPathChange: handleCloseMenu });

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <header className=" fixed w-full top-0  z-40">
            <div
                className={`absolute right-2 shadow-sm shadow-black-600  bg-white-50 z-10 top-28`}
                ref={dropdownRef}
            >
                {show && <DropNav handleClick={handleClick} />}
            </div>
            <nav
                className={`px-12 tabletM:px-8 tabletS:px-4 py-6 flex justify-between items-center 
            transition duration-500 ease-in-out
            ${
                theme === 'lightMode'
                    ? ' bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            }`}
            >
                <div>
                    <Link title="chatter" to={`/`}>
                        <Typography
                            variant={1}
                            className="text-3xl mobileM:text-2xl font-semibold text-pink-600"
                        >
                            Chatter
                        </Typography>
                    </Link>
                </div>

                <Link to="/feed">
                    <Typography
                        title="feed"
                        variant={2}
                        className=" text-2xl mobileM:text-xl font-semibold"
                    >
                        Feed
                    </Typography>
                </Link>

                <div className="flex items-center">
                    {width > 640 && (
                        <div className="me-8">
                            <Button
                                title="write a post"
                                className="flex items-center font-semibold bg-pink-600 text-white-50 p-2 rounded-[40px]"
                            >
                                <span className="me-1">Write a post</span>
                                <span>
                                    <FaPen className="text-base" />
                                </span>
                            </Button>
                        </div>
                    )}

                    <div className="me-8 tabletXS:me-4">
                        <Button
                            onClick={toggleTheme}
                            title="change theme"
                            className="text-2xl mobileL:text-xl"
                        >
                            {theme === 'lightMode' ? <FaMoon /> : <FaSun />}
                        </Button>
                    </div>

                    <div>
                        <Button
                            title="user profile"
                            className="text-5xl tabletXS:text-3xl"
                            onClick={handleClick}
                        >
                            <FaUserCircle />
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};
