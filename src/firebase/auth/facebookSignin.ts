import firebaseApp from '../config';
import { getAuth, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { checkFacebookError } from '../utils/checkFacebookError';

export const facebookSignin = async () => {
   const auth = getAuth(firebaseApp);
   auth.languageCode = 'it';
   const provider = new FacebookAuthProvider();
   provider.addScope('user_birthday');

   let token: string | undefined;
   let userInfo: any;

   try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      userInfo = result.user;

      // This gives you a Facebook Access Token.
      const credential = FacebookAuthProvider.credentialFromResult(result);

      if (credential) {
         token = credential.accessToken;
      }
   } catch (error) {
      console.log('Facebook sign-in error:', error);
      checkFacebookError(error);
      // Handle error
      return null;
   }

   return { token, userInfo };
};
