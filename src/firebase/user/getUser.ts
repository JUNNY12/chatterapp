import firebaseApp from '../config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const getUserIdFromStore = async (uid: any) => {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);

    let userExists = false;

    querySnapshot.forEach((doc) => {
        if (doc.id === uid) {
            console.log(doc.id);
            userExists = true;
            return;
        }
    });

    return userExists;
};
