import firebaseApp from '../config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const deleteArticle = async (uid: any, articleId: any) => {
   const db = getFirestore(firebaseApp);

   try {
      await deleteDoc(doc(db, 'users', uid, 'article', articleId));
      toast.success('Article deleted successfully', {
         position: 'top-right',
         autoClose: 1000,
         hideProgressBar: true,
         closeOnClick: true,
         draggable: true,
      });
   } catch (error) {
      toast.error('Error deleting article');
   }
};
