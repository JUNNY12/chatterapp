import { FeedPosts } from './FeedPosts';
import { FetchUserFeedPostContextProvider } from '../../context/article/FetchUserFeedPostContext';
import { MetaTag } from '../../components/metatag/MetaTag';
import { chatterImgUrl } from '../../config/constants/url';

export default function Feed(): React.JSX.Element {
   return (
      <FetchUserFeedPostContextProvider>
         <MetaTag
            title="Chatter | Feed"
            ogTitle="Explore posts on our platform"
            description="Stay updated on latest post based on your interests"
            image={chatterImgUrl}
            url="/feed"
            twitterTitle="Share your creativity with the world"
            twitterDescription="Stay updated on latest post based on your interests"
            twitterImage={chatterImgUrl}
            twitterCard="summary_large_image"
            ogType="website"
            href="/feed"
         />
         <section className={` bg-white-100 `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <FeedPosts />
            </div>
         </section>
      </FetchUserFeedPostContextProvider>
   );
}
