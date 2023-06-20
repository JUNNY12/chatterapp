import firebaseApp from '../config';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const db = getFirestore(firebaseApp);

export const publishArticle = async (uid: any, article: any) => {
   let articleRefId: any;
   try {
      const articleRef = collection(db, 'users', uid, 'article');
      await setDoc(doc(articleRef), article);
      articleRefId = articleRef.id;
      toast.success('Yout Post has been Published', {
         position: 'top-center',
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      });
   } catch (e) {
      console.log(e);
      toast.error('something went wrong');
   }

   return articleRefId;
};
