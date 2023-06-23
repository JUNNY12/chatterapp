import { ExplorePosts } from '.';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function Explore(): React.JSX.Element {
   return (
      <>
         <MetaTag
            title="Chatter | Explore"
            ogTitle="Explore posts on our platform"
            description="Explore the latest posts on our platform and stay connectedAnalytics of your posts"
            image={chatterImgUrl}
            url="/explore"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Explore the latest posts on our platform and stay connected"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/explore"
         />
         <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <ExplorePosts />
            </div>
         </section>
      </>
   );
}
