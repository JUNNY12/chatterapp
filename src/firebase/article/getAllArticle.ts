import firebaseApp from '../config';
import { getFirestore, collectionGroup, getDocsFromServer } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const getAllArticle = async () => {
   try {
      const articlesRef = collectionGroup(db, 'article');
      const snapshot = await getDocsFromServer(articlesRef);
      const articles = snapshot.docs.map((doc) =>
         // console.log("doc.id", doc.id),
         ({
            id: doc.id,
            ...doc.data(),
         })
      );
      return { articles, error: null };
   } catch (error) {
      console.error('Error fetching articles:', error);
      return { articles: [], error };
   }
};
