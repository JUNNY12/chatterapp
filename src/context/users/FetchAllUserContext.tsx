import { createContext, useState, useEffect } from 'react';
import { getAllUsers } from '../../firebase/user';

export interface UserInterface {
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
   socialInfo: {
      twitter: string;
      instagram: string;
      facebook: string;
      github: string;
      linkedIn: string;
      website?: string; // Optional property for backward compatibility
   };
   status?: string;
}

interface UserContextInterface {
   allUsers: UserInterface[];
   loading: boolean;
}

export const UserContext = createContext<UserContextInterface>({
   allUsers: [],
   loading: true,
});

type Children = {
   children: React.ReactNode;
};

export const UsersProvider = ({ children }: Children) => {
   const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchUsers = async () => {
      try {
         setLoading(true);
         const { users } = await getAllUsers();
         setAllUsers(users);
         setLoading(false);
      } catch (error) {
         console.error('Error fetching users:', error);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   return <UserContext.Provider value={{ allUsers, loading }}>{children}</UserContext.Provider>;
};
