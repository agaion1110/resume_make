import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import LoginDialog from '@/components/LoginDialog/LoginDialog';
// import { closeGlobalLoading } from '@/utils/common';


const Index = () => import('@/views/index/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '首页',
        },
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 全局守卫：登录拦截 本地没有存token,请重新登录
// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     const token = localStorage.getItem('token');
//     const userInfo = localStorage.getItem('userInfo');
//     // 需要权限且已经登录
//     if (to.meta.requireLogin && !token) {
//         closeGlobalLoading(); // 关闭全局等待层
//         LoginDialog(true, to.fullPath);
//     } else if (to.meta.requireLogin && token) {
//         // 需要权限且已经登录
//         if (userInfo) {
//             const emailVerify = JSON.parse(userInfo as string).auth.email.valid;
//             if (emailVerify) {
//                 next();
//             } else {
//                 router.push({
//                     path: '/emailVerify',
//                     query: {
//                         email: JSON.parse(userInfo as string).email
//                     }
//                 });
//                 closeGlobalLoading(); // 关闭全局等待层
//             }
//         } else {
//             closeGlobalLoading(); // 关闭全局等待层
//             LoginDialog(true, to.fullPath);
//         }
//     } else {
//         next();
//     }
// });
export default router;