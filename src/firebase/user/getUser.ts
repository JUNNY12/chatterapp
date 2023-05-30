import firebaseApp from '../config';
import {
    getFirestore,
    getDocsFromServer,
    collection,
} from 'firebase/firestore';

export const getUser = async (uid: any) => {
    const db = getFirestore(firebaseApp);
    const querySnapshot = await getDocsFromServer(
        collection(db, 'users', uid, 'profile')
    );

    const userData: any = [];

    querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() });
    });

    return userData;
};
