import { FeaturedPosts } from '.';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function Feature(): React.JSX.Element {
   return (
      <>
         <MetaTag
            title="Chatter | Featured"
            ogTitle="Featured posts on our platform"
            description="Analytics of your posts"
            image={chatterImgUrl}
            url="/featured"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Featured posts on our platform"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/featured"
         />
         <section className={` bg-white-100  `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <FeaturedPosts />
            </div>
         </section>
      </>
   );
}
