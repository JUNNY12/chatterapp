import React from 'react';
import { useRoutes } from 'react-router-dom';
import {
    GeneralLayout,
    OnboardLayout,
    FeedLayout,
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

export function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <GeneralLayout />,
            children: [{ index: true, element: <LazyHome /> }],
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
            children: [{ index: true, element: <LazyFeed /> }],
        },
    ]);
}
