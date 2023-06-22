import { FeedPosts } from './FeedPosts';
import { FetchUserFeedPostContextProvider } from '../../context/article/FetchUserFeedPostContext';
import { Helmet } from 'react-helmet-async';


export default function Feed(): React.JSX.Element {
   return (
      <FetchUserFeedPostContextProvider>
         <Helmet>
            <title>Chatter | Feed</title>
            <meta name="description" content="Stay updated on latest post based on your interests " />
            <link rel="canonical" href="/feed" />
         </Helmet>
         <section className={` bg-white-100 `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <FeedPosts />
            </div>
         </section>
      </FetchUserFeedPostContextProvider>
   );
}
