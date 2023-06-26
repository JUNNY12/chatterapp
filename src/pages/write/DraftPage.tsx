import { useArticleContext } from '../../hooks/article/useArticleContext';
import { MarkdownEditor } from '.';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { publishArticle, saveDraft } from '../../firebase/article';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

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

   // publish article
   const handlePublish = async () => {
      try {
         await publishArticle(user?.uid, article);
         await redirect();
         clearArticle();
      } catch (e) {
         console.log(e);
      }
   };

   // save draft
   const handleDraft = async () => {
      console.log('handle draft');
      try {
         await saveDraft(user?.uid, article);
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <>
         <MetaTag
            title="Chatter | Write"
            ogTitle="Share your creativity with the world"
            description="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals"
            image={chatterImgUrl}
            url="/write"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/write"
         />
         <section className="pt-32  bg-white-100 relative">
            <div>
               <MarkdownEditor
                  content={article}
                  onPublish={handlePublish}
                  onSaveDraft={handleDraft}
               />
            </div>
         </section>
      </>
   );
}
