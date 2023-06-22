import { ExplorePosts } from '.';
import { Helmet } from 'react-helmet-async';

export default function Explore(): React.JSX.Element {
   return (
      <>
         <Helmet>
            <title>Chatter | Explore</title>
            <meta name="description" content="Explore the latest posts on our platform and stay connected" />
            <link rel="canonical" href="/explore" />
         </Helmet>
         <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <ExplorePosts />
            </div>
         </section>
      </>
   );
}
