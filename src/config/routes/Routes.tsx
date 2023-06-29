import React from 'react';
import { useRoutes } from 'react-router-dom';
import {
   GeneralLayout,
   OnboardLayout,
   FeedLayout,
   UserLayout,
   ProfileUserLayout,
} from '../../components/layout';
import {
   Onboard,
   CreateAccountTemplate,
   ReasonTemplate,
   InterestedTagTemplate,
   FinishTemplate,
} from '../../pages/onboard';
import Slug from '../../pages/slug/Slug';

const LazyHome = React.lazy(() => import('../../pages/home/Home'));
const LazyFeed = React.lazy(() => import('../../pages/feed/Feed'));
const LazyFeature = React.lazy(() => import('../../pages/featured/Feature'));
const LazyExplore = React.lazy(() => import('../../pages/explore/Explore'));
const LazyProfile = React.lazy(() => import('../../pages/settings/profile/Profile'));
const LazyAccount = React.lazy(() => import('../../pages/settings/account/Account'));
const LazyManagePost = React.lazy(() => import('../../pages/settings/posts/Post'));
const LazyTrending = React.lazy(() => import('../../pages/trending/Trending'));
const LazyPostPage = React.lazy(() => import('../../pages/write/EditPost'));
const LazyDraftPage = React.lazy(() => import('../../pages/write/DraftPage'));
const LazyNotFound = React.lazy(() => import('../../pages/notfound/NotFound'));
const LazyPreviewSlug = React.lazy(() => import('../../pages/settings/posts/PreviewSlug'));
const LazyAnalytics = React.lazy(() => import('../../pages/analytics/Analytics'));
const LazyUser = React.lazy(() => import('../../pages/user/User'));
const LazyBookmarks = React.lazy(() => import('../../pages/bookmark/Bookmark'));

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

      {
         path: '/explore',
         element: <FeedLayout />,
         children: [{ index: true, element: <LazyExplore /> }],
      },
      {
         path: '/trending/:tag',
         element: <FeedLayout />,
         children: [{ index: true, element: <LazyTrending /> }],
      },
      {
         path: '/featured',
         element: <FeedLayout />,
         children: [{ index: true, element: <LazyFeature /> }],
      },
      {
         path: '/bookmarks',
         element: <FeedLayout />,
         children: [{ index: true, element: <LazyBookmarks /> }],
      },
      {
         path: '/analytics',
         element: <FeedLayout />,
         children: [{ index: true, element: <LazyAnalytics /> }],
      },
      {
         path: '/write',
         element: <FeedLayout />,
         children: [
            { index: true, element: <LazyDraftPage /> },
            { path: 'edit/:id', element: <LazyPostPage /> },
         ],
      },
      {
         path: '/post/:fullName/:slug',
         element: <FeedLayout />,
         children: [{ index: true, element: <Slug /> }],
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
      {
         path: '/preview',
         element: <UserLayout />,
         children: [
            { index: true, element: <FeedLayout /> },
            { path: ':slug', element: <LazyPreviewSlug /> },
         ],
      },
      { path: '*', element: <LazyNotFound /> },
      {
         path: '/user/:displayName',
         element: <ProfileUserLayout />,
         children: [{ index: true, element: <LazyUser /> }],
      },
   ]);
}
