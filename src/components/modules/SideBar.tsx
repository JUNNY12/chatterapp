import { useThemeContext } from '../../hooks/theme/useThemeContext';
import { MdFeed, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { RiDraftLine } from 'react-icons/ri';
import { DiGoogleAnalytics } from 'react-icons/di';

export const SideBar = (): React.JSX.Element => {
    const { theme } = useThemeContext();

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
                <li className="mb-6 cursor-pointer hover:text-pink-600">
                    <MdFeed className="inline-block me-2" />
                    <span>My Feed</span>
                </li>
                <li className="mb-6 cursor-pointer hover:text-pink-600">
                    <RiDraftLine className="inline-block me-2" />
                    <span>Drafts</span>
                </li>
                <li className="mb-6 cursor-pointer hover:text-pink-600">
                    <MdOutlineFeaturedPlayList className="inline-block me-2" />
                    <span> Featured Post</span>
                </li>
                <li className="mb-6 cursor-pointer hover:text-pink-600">
                    <DiGoogleAnalytics className="inline-block me-2" />
                    <span>Analytics</span>
                </li>
            </ul>
        </div>
    );
};
