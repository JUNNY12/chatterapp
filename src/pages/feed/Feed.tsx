import { FeedPosts } from './FeedPosts';


export default function Feed(): React.JSX.Element {

    return (
        <section className={` bg-white-100 pb-12 `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
                <FeedPosts />
            </div>
        </section>
    );
}
