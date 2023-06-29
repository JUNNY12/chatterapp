import { TrendingPosts } from './TrendingPost';
import { useParams } from 'react-router';

export default function Trending(): React.JSX.Element {
   const { tag } = useParams();

   return (
      <>
         <section className={` bg-white-100`}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
               <TrendingPosts tag={tag} />
            </div>
         </section>
      </>
   );
}
