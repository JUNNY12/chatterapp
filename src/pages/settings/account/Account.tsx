import { Button, Typography } from '../../../components/element';
import { useThemeContext } from '../../../hooks/theme/useThemeContext';

export default function Account(): React.JSX.Element {
    const { theme } = useThemeContext();

    return (
        <div
            className={` transition p-4 me-8  tabletL:ms-8 tabletXS:mx-4 duration-500 mb-4 rounded-md border border-gray-300 ease-in-out ${
                theme === 'lightMode'
                    ? 'bg-white-50 text-black-950'
                    : theme === 'darkMode' && 'bg-gray-800 text-white-100'
            } `}
        >
            <div className="">
                <Typography
                    variant={1}
                    className="font-bold text-red-600 text-2xl mobileXL:text-lg p-4"
                >
                    Delete Account
                </Typography>

                <p className=" max-w-[800px] mb-4">
                    Your personal data will be deleted permanently when you
                    delete your account on Chatter. This action is irreversible.
                </p>

                <Button className=" w-[200px] p-2 rounded-[40px] text-white-50 bg-red-600 ">
                    {' '}
                    Delete Account
                </Button>
            </div>
        </div>
    );
}
