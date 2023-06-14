import { useArticleContext } from '../../hooks/article/useArticleContext';
import { MarkdownEditor } from '.';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { publishArticle } from '../../firebase/article';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export default function DraftPage() {
   const { article, clearArticle, setArticle } = useArticleContext();
   const { user } = useAuthContext();
   const navigate = useNavigate();

   const fetchUser = async () => {
      if (user) {
         setArticle((prevState) => ({
            ...prevState,
            author: {
               authorId: user?.uid,
            },
         }));
      }
   };
   useEffect(() => {
      fetchUser();
   }, [user]);

   const redirect = async () => {
      navigate('/settings/post');
   };

   const handlePublish = async () => {
      console.log('handleDraft');
      try {
         await publishArticle(user?.uid, article);
         await redirect();
         clearArticle();
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <section className="pt-32  bg-white-100 relative">
         <div>
            <MarkdownEditor content={article} onSave={handlePublish} />
         </div>
      </section>
   );
}
