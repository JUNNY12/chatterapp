import { Outlet, useLocation } from 'react-router-dom';
import { SideBar, FeedNav } from '../modules';
import { useWidth } from '../../hooks';
import { useNav } from '../../hooks/nav/useNav';
import { useEffect } from 'react';
import PostProvider from '../../context/article/FetchAllPostContext';
import { ArticleInteractionProvider } from '../../context/article/ArticleInteractionContext';

export const FeedLayout = (): React.JSX.Element => {
    const width = useWidth();
    const { pathname } = useLocation();
    const { show, setShow } = useNav();

    useEffect(() => {
        setShow(false);
        if (width > 768) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [width, setShow, pathname]);

    return (
        <PostProvider>
            <ArticleInteractionProvider>
                <FeedNav />
                <div>{!show && <SideBar />}</div>
                <Outlet />
            </ArticleInteractionProvider>
        </PostProvider>
    );
};
