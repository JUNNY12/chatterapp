import { getAuth, deleteUser, reauthenticateWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../config';

export async function deleteAccount() {
   const auth = getAuth();
   const user = auth.currentUser;
   const db = getFirestore(firebaseApp);

   if (user) {
      try {
         // Reauthenticate the user with Google provider
         const provider = new GoogleAuthProvider();
         await reauthenticateWithPopup(user, provider);

         // Delete the user's data
         await deleteDoc(doc(db, 'users', user?.uid));
         await deleteUser(user);

         // Account deletion successful
         console.log('Account deleted successfully.');
      } catch (error) {
         // Handle any errors that occurred during reauthentication or deletion
         console.error('Error deleting account:', error);
      }
   } else {
      console.error('No user found.');
   }
}
