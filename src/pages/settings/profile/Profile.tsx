import { useThemeContext } from '../../../hooks/theme/useThemeContext';
import { BasicInfo, SocialInfo } from '.';
import { Button } from '../../../components/element';

export default function Profile(): React.JSX.Element {
    const { theme } = useThemeContext();

    return (
        <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
                theme === 'lightMode'
                    ? 'bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
        >
            <form className="">
                <div className="flex tabletXS:flex-col">
                    <div className=" w-1/2 tabletXS:w-full">
                        <BasicInfo />
                    </div>

                    <div className=" w-1/2 ms-8 tabletXS:w-full tabletXS:ms-0">
                        <SocialInfo />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center">
                    <Button className=" w-[200px] p-2 rounded-[40px] text-white-50 bg-pink-600 ">
                        {' '}
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}
