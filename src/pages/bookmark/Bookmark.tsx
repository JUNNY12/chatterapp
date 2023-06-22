import { BookmarkPosts } from '.';
import { Helmet } from 'react-helmet-async';

export default function Bookmark(): React.JSX.Element {
   return (
     <>
         <Helmet>
            <title>Chatter | Bookmark</title>
            <meta name="description" content="Bookmark your favourite posts and view them later" />
            <link rel="canonical" href="/bookmark" />
         </Helmet>
         <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <BookmarkPosts />
            </div>
         </section>
     </>
   );
}
