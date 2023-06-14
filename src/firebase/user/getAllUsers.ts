import firebaseApp from '../config';
import { getFirestore, collectionGroup, getDocs } from 'firebase/firestore';
import { UserInterface } from '../../context/users/FetchAllUserContext';

const db = getFirestore(firebaseApp);

export const getAllUsers = async () => {
   try {
      const userRef = collectionGroup(db, 'profile');
      const snapshot = await getDocs(userRef);
      const users = snapshot.docs.map((doc) => ({
         ...(doc.data() as UserInterface),
      }));
      return { users, error: null };
   } catch (error) {
      console.error('Error fetching users:', error);
      return { users: [], error };
   }
};
