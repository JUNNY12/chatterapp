import { ThemeProvider } from '../context/theme/ThemeContext';
import AuthProvider from '../context/auth/AuthContext';
import { NavProvider } from '../context/nav/NavContext';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../firebase/user';

interface ProviderProps {
    children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProviderProps) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<any>({
        status: '',
    });

    let uid: any;

    //get user status
    useEffect(() => {
        if (user) {
            uid = user.uid;

            const getUserDetails = async () => {
                const userData = await getUser(uid);
                setUserDetails({
                    ...userDetails,
                    status: userData[0].data.status,
                });
            };
            getUserDetails();
        }
    }, [user]);

    //destructuring
    const { status } = userDetails;

    //redirect to feed if user is onboarded or redirect to onboard if user is not onboarded
    useEffect(() => {
        if (!user && !loading) {
            navigate('/onboard');
        }
        if (user && !loading && status === 'onboarded') {
            navigate('/feed');
        }
    }, [navigate, user, loading, status]);

    return <>{user ? children : null}</>;
};

//routes that need to be protected
const protectedRoutes = [
    '/onboard/finish',
    '/onboard/reason',
    '/onboard/create-account',
    '/onboard/interested-tag',
];

//Provider component
export const Provider = ({ children }: ProviderProps) => {
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <ThemeProvider>
            <NavProvider>
                <AuthProvider>
                    {protectedRoutes.includes(pathName) ? (
                        <ProtectedRoutes>{children}</ProtectedRoutes>
                    ) : (
                        <>{children}</>
                    )}
                </AuthProvider>
            </NavProvider>
        </ThemeProvider>
    );
};
