import firebaseApp from '../config';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const addProfileDetails = async (uid: string, details: any) => {
   let error;
   let userProfileRefId;
   try {
      const userProfileRef = collection(db, 'users', uid, 'profile');
      await setDoc(doc(userProfileRef), details);
      userProfileRefId = userProfileRef.id;
      // console.log(userProfileRefId);
   } catch (e) {
      console.log(e);
   }
   return { userProfileRefId, error };
};
