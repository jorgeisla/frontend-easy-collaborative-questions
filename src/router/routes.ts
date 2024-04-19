import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('pages/user/LoginPage.vue'),
        name: 'login',
    },
    {
        path: '/student',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'my-videos',
                component: () => import('pages/student/MyVideos.vue'),
                name: 'MyVideos',
                meta: { requiresAuth: true },
            },
            {
                path: 'watch/:id',
                component: () => import('pages/video/WatchVideoPage.vue'),
                name: 'WatchVideo',
                meta: { requiresAuth: true },
                props: true,
            },
        ],
    },
    {
        path: '/video',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'upload',
                component: () => import('pages/video/UploadVideoPage.vue'),
                name: 'UploadVideo',
                meta: { requiresAuth: true },
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
