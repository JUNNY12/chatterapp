import { FeaturedPosts } from '.';
import { Helmet } from 'react-helmet-async';

export default function Feature(): React.JSX.Element {
   return (
     <>
         <Helmet>
            <title>Chatter | Featured</title>
            <meta name="description" content="Featured posts on our platform" />
            <link rel="canonical" href="/featured" />
         </Helmet>
         <section className={` bg-white-100  `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <FeaturedPosts />
            </div>
         </section>
     </>
   );
}
