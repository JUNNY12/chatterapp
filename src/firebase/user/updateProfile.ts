import firebaseApp from '../config';
import { getFirestore, doc, updateDoc, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const updateProfile = async (uid: string, details: any) => {
   let error;
   let userProfileRefId;
   try {
      const userProfileRef = collection(db, 'users', uid, 'profile');
      const querySnapshot = await getDocs(userProfileRef);
      querySnapshot.forEach((doc) => {
         userProfileRefId = doc.id;
      });
      await updateDoc(doc(userProfileRef, userProfileRefId), details);
   } catch (e) {
      console.log(e);
   }
   return { userProfileRefId, error };
};
