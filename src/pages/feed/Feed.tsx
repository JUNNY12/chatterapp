import { FeedPosts } from './FeedPosts';
import { FetchUserFeedPostContextProvider } from '../../context/article/FetchUserFeedPostContext';

export default function Feed(): React.JSX.Element {
    return (
      <FetchUserFeedPostContextProvider>
            <section className={` bg-white-100 `}>
                <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
                    <FeedPosts />
                </div>
            </section>
        </FetchUserFeedPostContextProvider>
    );
}
