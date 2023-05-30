import { Typography } from '../../../components/element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { FaTrash } from 'react-icons/fa';

export default function Post(): React.JSX.Element {
    const { theme } = useThemeContext();
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

                <div>
                    <div className="flex items-center font-semibold">
                        <div className="me-3 w-[70%]">Posts</div>
                        <div className="me-3  w-[20%]">Date</div>
                        <div className="me-3 w-[10%]">Actions</div>
                    </div>

                    <div className="flex items-center mt-8">
                        <div className="me-3 w-[70%]">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <div className="me-3  w-[20%]">May 25, 2023</div>
                        <div
                            className="me-3 w-[10%] text-red-600 cursor-pointer"
                            title="delete post"
                            role="button"
                        >
                            <FaTrash />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
