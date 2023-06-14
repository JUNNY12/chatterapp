import firebaseApp from '../config';
import { getFirestore, getDocsFromServer, collection } from 'firebase/firestore';

export const getUser = async (uid: any) => {
   const db = getFirestore(firebaseApp);
   const querySnapshot = await getDocsFromServer(collection(db, 'users', uid, 'profile'));

   let userData: any = {};

   querySnapshot.forEach((doc) => {
      userData = {
         id: doc.id,
         ...doc.data(),
      };
   });

   return userData;
};
