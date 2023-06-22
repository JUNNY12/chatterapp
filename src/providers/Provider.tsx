import { ThemeProvider } from '../context/theme/ThemeContext';
import AuthProvider from '../context/auth/AuthContext';
import { NavProvider } from '../context/nav/NavContext';
import { ArticleProvider } from '../context/article/ArticleContext';
import { useAuthContext } from '../hooks/auth/useAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../firebase/user';
import { UserProvider } from '../context/users/GetUserContext';
import { SearchContextProvider } from '../context/search/SearchContext';
import PostProvider from '../context/article/FetchAllPostContext';

//interface for provider props
interface ProviderProps {
   children: React.ReactNode;
}

//protected routes of onboard pages
const ProtectedRoutes = ({ children }: ProviderProps) => {
   const { user, loading } = useAuthContext();
   const navigate = useNavigate();
   const [userDetails, setUserDetails] = useState<{ status: string }>({
      status: '',
   });

   // Get user status
   useEffect(() => {
      const fetchUserDetails = async () => {
         if (user) {
            const userData = await getUser(user.uid);
            console.log(userData);
            setUserDetails((prevUserDetails) => ({
               ...prevUserDetails,
               status: userData.status,
            }));
         }
      };

      fetchUserDetails();
   }, [user]);

   // Redirect to feed if user is onboarded or redirect to onboard if user is not onboarded
   useEffect(() => {
      const checkUserStatus = async () => {
         if (!user && !loading) {
            navigate('/onboard');
         }
         if (!loading && userDetails.status === 'onboarded') {
            navigate('/feed');
         }
      };

      checkUserStatus();
   }, [navigate, user, loading, userDetails.status]);

   return <>{user ? children : null}</>;
};

// Routes that need to be protected
const protectedRoutes = [
   '/onboard/finish',
   '/onboard/reason',
   '/onboard/create-account',
   '/onboard/interested-tag',
];

// Protected pages for user settings
const Protected = ({ children }: ProviderProps) => {
   const { user, loading } = useAuthContext();
   const navigate = useNavigate();

   useEffect(() => {
      const checkUserStatus = async () => {
         if (!user && !loading) {
            navigate('/onboard');
         }
      };

      checkUserStatus();
   }, [navigate, user, loading]);

   return <>{user ? children : null}</>;
};

const protectProfilePage = [
   '/settings',
   '/settings/post',
   '/settings/account',
   '/preview',
   '/feed',
   '/write',
   '/analytics',
   '/bookmarks',
];

// Provider component
export const Provider = ({ children }: ProviderProps) => {
   const location = useLocation();
   const pathName = location.pathname;

   return (
      <ThemeProvider>
         <PostProvider>
            <SearchContextProvider>
               <NavProvider>
                  <AuthProvider>
                     <UserProvider>
                        <ArticleProvider>
                           {protectedRoutes.includes(pathName) ? (
                              <ProtectedRoutes>{children}</ProtectedRoutes>
                           ) : protectProfilePage.includes(pathName) ? (
                              <Protected>{children}</Protected>
                           ) : (
                              <>{children}</>
                           )}
                        </ArticleProvider>
                     </UserProvider>
                  </AuthProvider>
               </NavProvider>
            </SearchContextProvider>
         </PostProvider>
      </ThemeProvider>
   );
};
