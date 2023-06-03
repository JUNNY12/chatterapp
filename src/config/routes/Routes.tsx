import React from 'react';
import { useRoutes } from 'react-router-dom';
import {
    GeneralLayout,
    OnboardLayout,
    FeedLayout,
    UserLayout,
} from '../../components/layout';
import {
    Onboard,
    CreateAccountTemplate,
    ReasonTemplate,
    InterestedTagTemplate,
    FinishTemplate,
} from '../../pages/onboard';

const LazyHome = React.lazy(() => import('../../pages/home/Home'));
const LazyFeed = React.lazy(() => import('../../pages/feed/Feed'));
const LazyFeature = React.lazy(() => import('../../pages/featured/Feature'));
const LazyExplore = React.lazy(() => import('../../pages/explore/Explore'));
const LazySlug = React.lazy(() => import('../../pages/userpost/Slug'));
const LazyProfile = React.lazy(
    () => import('../../pages/settings/profile/Profile')
);
const LazyAccount = React.lazy(
    () => import('../../pages/settings/account/Account')
);
const LazyManagePost = React.lazy(
    () => import('../../pages/settings/posts/Post')
);

const LazyPostPage = React.lazy(() => import('../../pages/write/EditPost'));
const LazyDraftPage = React.lazy(() => import('../../pages/write/DraftPage'));

const LazyNotFound = React.lazy(() => import('../../pages/notfound/NotFound'));

export function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <GeneralLayout />,
            children: [
                { index: true, element: <LazyHome /> },
                { path: '*', element: <LazyNotFound /> },
            ],
        },
        {
            path: '/onboard',
            element: <OnboardLayout />,
            children: [
                { index: true, element: <Onboard /> },
                { path: 'create-account', element: <CreateAccountTemplate /> },
                { path: 'reason', element: <ReasonTemplate /> },
                { path: 'interested-tag', element: <InterestedTagTemplate /> },
                { path: 'finish', element: <FinishTemplate /> },
            ],
        },
        {
            path: '/feed',
            element: <FeedLayout />,
            children: [
                { index: true, element: <LazyFeed /> },
                { path: 'feature', element: <LazyFeature /> },
                { path: 'explore', element: <LazyExplore /> },
            ],
        },
        {
            path: '/write',
            element: <FeedLayout />,
            children: [
                { index: true, element: <LazyDraftPage /> },
                { path: 'edit', element: <LazyPostPage /> },
            ],
        },
        {
            path: '/:fullName/:slug',
            element: <FeedLayout />,
            children: [{ index: true, element: <LazySlug /> }],
        },
        {
            path: '/settings',
            element: <UserLayout />,
            children: [
                { index: true, element: <LazyProfile /> },
                { path: 'account', element: <LazyAccount /> },
                { path: 'post', element: <LazyManagePost /> },
            ],
        },
    ]);
}
