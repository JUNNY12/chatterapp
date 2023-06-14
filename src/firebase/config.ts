import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
   apiKey: import.meta.env.VITE_API_KEY,
   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDING_ID,
   appId: import.meta.env.VITE_APP_ID,
   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

let firebaseApp;
firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp as FirebaseApp;
