import firebaseApp from '../config';
import { getFirestore, doc, updateDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const updateDraft = async (authordId: string, articleId: any, draft: any) => {
   try {
      const articleRef = collection(db, 'users', authordId, 'drafts');
      await updateDoc(doc(articleRef, articleId), draft);
      console.log('Draft successfully updated!');
   } catch (e) {
      console.log(e);
   }
};
