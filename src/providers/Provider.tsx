import { ThemeProvider } from '../context/theme/ThemeContext';
import AuthProvider from '../context/auth/AuthContext';
import { NavProvider } from '../context/nav/NavContext';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface ProviderProps {
    children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProviderProps) => {
    const { user, loading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate('/onboard');
        }
    }, [navigate, user, loading]);

    return <>{user ? children : null}</>;
};

const noAuthRoutes = [
    '/onboard',
    '/feed',
    '/feed/feature',
    '/',
    '/feed/explore',
];

export const Provider = ({ children }: ProviderProps) => {
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <ThemeProvider>
            <NavProvider>
                <AuthProvider>
                    {noAuthRoutes.includes(pathName) ? (
                        <>{children}</>
                    ) : (
                        <ProtectedRoutes>{children}</ProtectedRoutes>
                    )}
                </AuthProvider>
            </NavProvider>
        </ThemeProvider>
    );
};
