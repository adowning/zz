import { useAppStore } from '@/stores/app.store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/home.vue'
import LoginView from '../pages/login.vue'
import GameView from '../pages/games.vue'
import DefaultLayout from '../layouts/default.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'user-parent',
            component: DefaultLayout,
            children: [{ path: '', name: 'home', component: HomeView }],
        },
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomeView,
        //     meta: { requiresAuth: true },
        // },
        // {
        //     path: '/vip',
        //     name: 'vip',
        //     component: () => import('../views/Vip.vue'),
        //     meta: { requiresAuth: true },
        // },
        {
            path: '/login',
            name: '/login',
            component: LoginView,
        },
        // {
        //     path: '/leaderboard',
        //     name: 'leaderboard',
        //     component: LeaderBoard,
        // },
        {
            path: '/games/redtiger',
            name: 'redtiger',
            component: GameView,
        },
        {
            path: '/games/nolimit',
            name: 'nolimit',
            component: GameView,
        },
    ],
})

router.beforeEach((_to, _from, next) => {
    const appStore = useAppStore()
    const authStore = useAuthStore()
    const key = authStore.getAccessToken // storage.getItem('accessToken')
    console.log('key', key)
    // Wait for auth initialization readiness to avoid redirect races
    // if (!key) {
    //     await new Promise<void>((resolve) => {
    //         const id = setInterval(() => {
    //             if (key) {
    //                 clearInterval(id)
    //                 resolve()
    //             }
    //         }, 10)
    //     })
    // }
   if(key){
         authStore.initWebSocket()
   }

    // Ensure loader is not masking the login screen
    if (_to.path === '/login') {
        appStore.hideLoading()
    }

    if (
        !key &&
        _to.path !== '/login' &&
        _to.path !== '/games/redtiger'
    ) {
        next('/login')
    } else {
        next()
    }
})

export default router
