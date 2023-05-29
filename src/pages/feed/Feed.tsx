import { SideBar } from '../../components/modules';
import { FeedPosts } from './FeedPosts';
import { useNav } from '../../hooks/nav/useNav';

export default function Feed(): React.JSX.Element {
    const { show } = useNav();

    return (
        <section className={` bg-white-100 pb-12 `}>
            <div className={` ms-[250px] tabletS:ms-0 pt-24  `}>
                <FeedPosts />
            </div>
        </section>
    );
}
