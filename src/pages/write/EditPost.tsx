import { MarkdownEditor } from '.';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { getUserDrafts } from '../../firebase/article/getUserDrafts';
import { updateDraft } from '../../firebase/article';
import { toast } from 'react-toastify';

export default function PostPage() {
   const { id } = useParams();
   const { article, setArticle } = useArticleContext();
   const [posts, setPosts] = useState([]) as any;
   const [loading, setLoading] = useState(false);
   const { userInfo } = useFetchUser();

   const fetchUserArticles = async () => {
      try {
         setLoading(true);
         const userDrafts = await getUserDrafts(userInfo?.uid);
         setPosts(userDrafts);
         setLoading(false);
      } catch (e) {
         console.log(e);
      }
   };

   console.log(article.author?.authorId);

   useEffect(() => {
      fetchUserArticles();
   }, [id, userInfo?.uid]);

   const draft = posts?.find((post: any) => post.id === id);

   useEffect(() => {
      if (draft) {
         const { data } = draft;
         setArticle(data);
      }
   }, [draft, id, setArticle]);

   const handleUpdate = async () => {
      console.log('handleUpdate');
      try {
         await updateDraft(userInfo?.uid, id, article);
         toast.success('Draft updated successfully', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <section className="pt-32 bg-white-100">
         
         <div>
            <MarkdownEditor onUpdate={handleUpdate} mode="update" />
         </div>
      </section>
   );
}
