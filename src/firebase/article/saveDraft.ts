import firebaseApp from '../config';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const db = getFirestore(firebaseApp);

export const saveDraft = async (uid: any, draft: any) => {
   let articleRefId: any;
   try {
      const articleRef = collection(db, 'users', uid, 'drafts');
      await setDoc(doc(articleRef), draft);
      articleRefId = articleRef.id;
      toast.success('Yout Post has been saved as draft');
   } catch (e) {
      console.log(e);
      toast.error('something went wrong');
   }

   return articleRefId;
};
