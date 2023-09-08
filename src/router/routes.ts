import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('pages/user/LoginPage.vue'),
    },
    {
        path: '/video',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'watch/:id',
                component: () => import('pages/video/WatchVideoPage.vue'),
                name: 'WatchVideo',
                meta: {},
                props: true,
            },
            {
                path: 'upload',
                component: () => import('pages/video/UploadVideoPage.vue'),
                name: 'UploadVideo',
                meta: {},
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
