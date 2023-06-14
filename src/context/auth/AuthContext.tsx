import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebaseApp from '../../firebase/config';

export interface AuthContextProps {
   user: User | null;
   loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

interface ChildrenProps {
   children: React.ReactNode;
}

export default function AuthProvider({ children }: ChildrenProps) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const auth = getAuth(firebaseApp);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
         } else {
            setUser(null);
         }
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
