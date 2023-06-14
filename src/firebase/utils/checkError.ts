import { toast } from 'react-toastify';

export const checkGoogleError = (error: any) => {
   switch (error.code) {
      case 'auth/account-exists-with-different-credential':
         toast.error('Account already exists with different credentials');
         break;
      case 'auth/invalid-credential':
         toast.error('Invalid credentials');
         break;
      case 'auth/operation-not-allowed':
         toast.error('Operation not allowed');
         break;
      case 'auth/user-disabled':
         toast.error('User disabled');
         break;
      case 'auth/user-not-found':
         toast.error('User not found');
         break;
      case 'auth/wrong-password':
         toast.error('Wrong password');
         break;
      default:
         toast.error('Something went wrong');
   }
};
