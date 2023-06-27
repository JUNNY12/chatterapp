import { createContext, useState, useEffect } from 'react';
import { getUser } from '../../firebase/user';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useLocation } from 'react-router';

export interface UserInfo {
   id: string;
   uid: string;
   displayName: string;
   fullName: string;
   email: string;
   photoUrl: string;
   occupation: string;
   bio: string;
   location: string;
   availability: string;
   tags: string[];
   followers: string[];
   socialInfo: {
      twitter: string;
      instagram: string;
      facebook: string;
      github: string;
      linkedIn: string;
      website?: string;
   };
}

interface UserContextInterface {
   userInfo: UserInfo;
   loading: boolean;
}

export const UserContext = createContext<UserContextInterface>({
   userInfo: {} as UserInfo,
   loading: true,
});

type Children = {
   children: React.ReactNode;
};

export const UserProvider = ({ children }: Children) => {
   const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
   const [loading, setLoading] = useState<boolean>(true);
   const { user } = useAuthContext();
   const location = useLocation();

   const fetchUser = async () => {
      try {
         setLoading(true);
         if (user?.uid) {
            const userData = await getUser(user.uid);
            setUserInfo(userData);
         }
         setLoading(false);
      } catch (error) {
         console.error('Error fetching user:', error);
      }
   };

   useEffect(() => {
      fetchUser();
   }, [user, location]);

   // console.log(userInfo);
   return <UserContext.Provider value={{ userInfo, loading }}>{children}</UserContext.Provider>;
};
