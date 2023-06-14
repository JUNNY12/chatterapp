import { ExplorePosts } from '.';

export default function Explore(): React.JSX.Element {
   return (
      <section className={` bg-white-100`}>
         <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
            <ExplorePosts />
         </div>
      </section>
   );
}
