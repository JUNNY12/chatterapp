import { signOut, getAuth } from 'firebase/auth';
import firebaseApp from '../config';
import { toast } from 'react-toastify';

export const logout = async () => {
   const auth = getAuth(firebaseApp);
   try {
      await signOut(auth);
      toast.success('Logged out successfully', {
         position: 'top-center',
         autoClose: 1000,
         hideProgressBar: true,
         closeOnClick: true,
         draggable: true,
         progress: undefined,
      });
   } catch (error) {
      console.log(error);
   }
};
