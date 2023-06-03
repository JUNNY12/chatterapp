import firebaseApp from '../config';
import { getFirestore, collectionGroup, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const getAllArticle = async () => {
    try {
        const articlesRef = collectionGroup(db, 'article');
        const snapshot = await getDocs(articlesRef);
        const articles = snapshot.docs.map((doc) => doc.data());
        return { articles, error: null };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { articles: [], error };
    }
};
