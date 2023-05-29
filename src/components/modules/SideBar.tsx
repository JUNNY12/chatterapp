import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { MdFeed, MdOutlineFeaturedPlayList, MdExplore } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { DiGoogleAnalytics } from 'react-icons/di';
import { NavLink } from 'react-router-dom';
import { Button } from '../element';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SideBar = (): React.JSX.Element => {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    //handle view write
    const handleViewWrite = () => {
        if (user) {
            navigate('/write');
        } else {
            navigate('/onboard');
        }
    };

    return (
        <div
            className={`h-full fixed z-10 top-0 pt-36 left-0 w-[250px]
            border-r border-gray-300 p-8 transition duration-500 ease-in-out 
        ${
            theme === 'lightMode'
                ? 'bg-white-50 text-black-950'
                : theme === 'darkMode' && 'bg-gray-800 text-white-100'
        }
        `}
        >
            <ul className="font-semibold text-xl">
                <li className="mb-6">
                    <Button
                        onClick={handleViewWrite}
                        title="write a post"
                        className="flex items-center font-medium bg-pink-600 text-white-50 p-2 rounded-[40px]"
                    >
                        <span className="me-1">Write a post</span>
                        <span>
                            <FaPen className="text-base" />
                        </span>
                    </Button>
                </li>
                <NavLink
                    to={`/feed`}
                    className={({ isActive }: any) =>
                        isActive ? 'text-pink-600' : ''
                    }
                    end
                >
                    <li
                        title="My Feed"
                        className="mb-6 cursor-pointer hover:text-pink-600"
                    >
                        <MdFeed className="inline-block me-2" />
                        <span>My Feed</span>
                    </li>
                </NavLink>

                <NavLink
                    to={'/feed/explore'}
                    className={({ isActive }: any) =>
                        isActive ? 'text-pink-600' : ''
                    }
                    end
                >
                    <li
                        title="Explore"
                        className="mb-6 cursor-pointer hover:text-pink-600"
                    >
                        <MdExplore className="inline-block me-2" />
                        <span>Explore</span>
                    </li>
                </NavLink>

                <li
                    title="Drafts"
                    className="mb-6 cursor-pointer hover:text-pink-600"
                >
                    <RiDraftLine className="inline-block me-2" />
                    <span>Drafts</span>
                </li>
                <NavLink
                    to={`/feed/feature`}
                    className={({ isActive }: any) =>
                        isActive ? 'text-pink-600' : ''
                    }
                    end
                >
                    <li
                        title="Featured Post"
                        className="mb-6 cursor-pointer hover:text-pink-600"
                    >
                        <MdOutlineFeaturedPlayList className="inline-block me-2" />
                        <span> Featured Post</span>
                    </li>
                </NavLink>
                <li
                    title="Analytics"
                    className="mb-6 cursor-pointer hover:text-pink-600"
                >
                    <DiGoogleAnalytics className="inline-block me-2" />
                    <span>Analytics</span>
                </li>
            </ul>
        </div>
    );
};
