import firebaseApp from '../config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { checkGoogleError } from '../utils/checkError';
import { toast } from 'react-toastify';

export const googleSignin = async () => {
   const provider = new GoogleAuthProvider();
   const auth = getAuth(firebaseApp);

   let result;
   let error;
   try {
      result = await signInWithPopup(auth, provider);
      // console.log(result);
      toast.success('Logged in successfully', {
         position: 'top-center',
         autoClose: 1000,
         hideProgressBar: true,
         closeOnClick: true,
         draggable: true,
         progress: undefined,
      });
   } catch (e) {
      error = e;
      console.log(error);
      checkGoogleError(error);
   }
   return { result, error };
};
