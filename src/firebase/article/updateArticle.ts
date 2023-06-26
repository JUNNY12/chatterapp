import firebaseApp from '../config';
import { getFirestore, doc, updateDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const updateArticle = async (authordId: string, articleId: any, details: any) => {
   try {
      const articleRef = collection(db, 'users', authordId, 'article');
      await updateDoc(doc(articleRef, articleId), details);
      // console.log('Document successfully updated!');
   } catch (e) {
      console.log(e);
   }
};
