import firebaseApp from '../config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const deleteDraft = async (uid: any, draftId: any) => {
   const db = getFirestore(firebaseApp);

   try {
      await deleteDoc(doc(db, 'users', uid, 'drafts', draftId));
      toast.success('draft deleted successfully', {
         position: 'top-right',
         autoClose: 1000,
         hideProgressBar: true,
         closeOnClick: true,
         draggable: true,
      });
   } catch (error) {
      toast.error('Error deleting draft');
   }
};
