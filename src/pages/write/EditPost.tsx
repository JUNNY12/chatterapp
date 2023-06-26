import { MarkdownEditor } from '.';
import { useArticleContext } from '../../hooks/article/useArticleContext';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { getUserDrafts } from '../../firebase/article/getUserDrafts';
import { updateDraft } from '../../firebase/article';
import { toast } from 'react-toastify';
import { publishArticle } from '../../firebase/article';
import { useNavigate } from 'react-router';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function PostPage() {
   const { id } = useParams();
   const { article, setArticle, clearArticle } = useArticleContext();
   const [posts, setPosts] = useState([]) as any;
   const { userInfo } = useFetchUser();
   const navigate = useNavigate();

   //fetch user drafts
   const fetchUserDrafts = async () => {
      try {
         if (userInfo.uid) {
            const userDrafts = await getUserDrafts(userInfo?.uid);
            setPosts(userDrafts);
         }
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      fetchUserDrafts();
   }, [id, userInfo?.uid]);

   // find the draft with the id
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
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      } catch (e) {
         console.log(e);
      }
   };

   const redirect = async () => {
      setTimeout(() => {
         navigate('/settings/post');
      }, 2000);
   };

   // publish article
   const handlePublish = async () => {
      try {
         await publishArticle(userInfo?.uid, article);
         await redirect();
         clearArticle();
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
            url="/write/edit"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Share your creativity with the world on our inclusive platform. Post diverse content, connect with like-minded individuals"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/write/edit"
         />
         <section className="pt-32 bg-white-100">
            <div>
               <MarkdownEditor onUpdate={handleUpdate} onPublish={handlePublish} mode="update" />
            </div>
         </section>
      </>
   );
}
