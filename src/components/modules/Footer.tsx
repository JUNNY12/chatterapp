'use client';

import { Button, Input, Typography } from '../element';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useThemeContext } from '../../hooks/theme/useThemeContext';

export const Footer = (): React.JSX.Element => {
    const { theme } = useThemeContext();

    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer
            className={`px-12 py-8 flex justify-center items-center flex-col transition duration-500 ease-in-out
        ${
            theme === 'lightMode'
                ? 'text-black-950 bg-white-100'
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
                <Typography variant={4} className="mb-3 text-2xl text-center">
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
    );
};
