import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { Button } from '../../element';
import { logout } from '../../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../firebase/user';
import { useEffect, useState } from 'react';
import { DropNavSkeleton } from '../skeletonloader/DropNavSkeleton';
import { NavLink } from 'react-router-dom';
import { greetings } from '../../../utils';

export const AuthenticatedDropNav = (): React.JSX.Element => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<any>({
        fullName: '',
        displayName: '',
        photoUrl: '',
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
                    fullName: userData[0].data.fullName,
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

    //handle sign out
    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/onboard');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col">
            {/* show nav skeleton if loading */}
            {loading ? (
                <DropNavSkeleton />
            ) : (
                <div>
                    <div className=" flex me-2 cursor-pointer font-semibold mb-4 pb-3 border-b border-black-300">
                        <div className=" relative w-[70px] h-[70px] object-cover rounded-full me-3 ">
                            <img
                                title="user profile picture"
                                className="rounded-full object-cover w-full h-full"
                                src={photoUrl}
                                alt={displayName}
                            />
                        </div>

                        <div className="text-base w-[100px]">
                            <div className="text-[14px]">{greetings()}</div>
                            <div>{displayName}</div>
                        </div>
                    </div>

                    <ul className=" mt-3 mb-4 font-semibold text-lg">
                        <NavLink to={`/feed`}>
                            <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                                My Feed
                            </li>
                        </NavLink>
                        <NavLink to={`/`}>
                            <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                                My Drafts
                            </li>
                        </NavLink>

                        <NavLink to={`/settings`}>
                            <li className="mb-3 hover:text-pink-600 transition duration-500 ease-in-out">
                                Account settings
                            </li>
                        </NavLink>
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
            )}
        </div>
    );
};
