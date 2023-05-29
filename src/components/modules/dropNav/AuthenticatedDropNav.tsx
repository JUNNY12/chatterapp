import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { Button } from '../../element';
import { logout } from '../../../firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthenticatedDropNav = (): React.JSX.Element => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/onboard');
        } catch (err) {
            console.log(err);
        }
    };

    const { user } = useAuthContext();
    const photoUrl: any = user?.photoURL;
    return (
        <div className="flex justify-center items-center flex-col">
            <div className=" flex justify-between items-center cursor-pointer font-semibold mb-4 pb-3 border-b border-black-300">
                <div className=" relative w-16 h-16 object-cover rounded-full me-3">
                    <img
                        title="user profile picture"
                        className="rounded-full"
                        src={photoUrl}
                        alt="user profile picture"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div>
                    <div>Juwon Emmanuel</div>
                    <div>@Junny</div>
                </div>
            </div>
            <ul className=" mt-3 mb-4 font-semibold text-lg">
                <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                    My Feed
                </li>
                <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                    My Drafts
                </li>
                <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                    Dashboard
                </li>
                <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                    Account settings
                </li>
            </ul>

            <div className=" ">
                <Button
                    title="Log out"
                    arialabel="Log out"
                    onClick={handleSignOut}
                    className=" bg-pink-600 text-white-50 me-2 w-[100px] rounded-[40px] p-2 font-semibold"
                >
                    Log out
                </Button>
            </div>
        </div>
    );
};
