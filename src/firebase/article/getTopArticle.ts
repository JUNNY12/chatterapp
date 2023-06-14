import firebaseApp from '../config';
import { getFirestore, collection, query, orderBy, getDocsFromServer } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export const getTopArticle = async () => {
   try {
      const articlesRef = collection(db, 'profile');
      // const q = query(articlesRef, where("likeCount", ">", 10), orderBy("likeCount"), limit(5));
      const q = query(articlesRef, orderBy('views', 'desc'), orderBy('likeCount', 'desc'));
      // console.log(q);
      const snapshot = await getDocsFromServer(q);
      // console.log(snapshot);

      const articles = snapshot.docs.map((doc) => doc.data());

      // console.log(articles);

      return { articles, error: null };
   } catch (error) {
      console.error('Error fetching top posts:', error);
      return { articles: [], error };
   }
};
