import { Outlet } from 'react-router-dom';
import { SideBar, FeedNav } from '../modules';
import { useWidth } from '../../hooks';
import { useNav } from '../../hooks/nav/useNav';
import { useEffect } from 'react';

export const FeedLayout = (): React.JSX.Element => {
    const width = useWidth();
    const { show, setShow } = useNav();

    useEffect(() => {
        if (width > 768) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [width, setShow]);

    return (
        <>
            <FeedNav />
            <div >
                {!show && <SideBar />}
            </div>
            <Outlet />
        </>
    );
};
