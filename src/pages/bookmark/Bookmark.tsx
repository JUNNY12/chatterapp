import { BookmarkPosts } from '.';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function Bookmark(): React.JSX.Element {
   return (
      <>
         <MetaTag
            title="Chatter | Bookmarks"
            ogTitle="Explore posts on our platform"
            description="Bookmark your favourite posts and view them later"
            image={chatterImgUrl}
            url="/bookmark"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Bookmark your favourite posts and view them later"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/bookmark"
         />
         <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <BookmarkPosts />
            </div>
         </section>
      </>
   );
}
