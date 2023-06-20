import firebaseApp from '../config';
import { getFirestore, getDocsFromServer, collection } from 'firebase/firestore';

export const getUserDrafts = async (uid: any) => {
   const db = getFirestore(firebaseApp);

   const articleSnapshot = await getDocsFromServer(collection(db, 'users', uid, 'drafts'));

   const userDrafts: any = [];

   if (articleSnapshot) {
      articleSnapshot.forEach((doc) => {
         userDrafts.push({ id: doc.id, data: doc.data() });
      });
   }

   return userDrafts;
};
