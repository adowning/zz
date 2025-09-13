import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import DefaultLayout from '../layouts/default.vue'
import GameView from '../pages/games.vue'
import HomeView from '../pages/home.vue'
import LoginView from '../pages/login.vue'

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
    {
      path: '/games/kickass',
      name: 'kickass',
      component: GameView,
    },
    {
      path: '/games/sw',
      name: 'sw',
      component: GameView,
    },
    {
      // path: '/affiliate/:tab?',
      path: '/affiliate',

      component: () => import('../pages/affiliate/index.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'affiliate', component: () => import('../pages/affiliate/index.vue') },
        {
          path: '/affiliate/dashboard',
          name: 'affiliate-dashboard',
          component: () => import('../pages/affiliate/index.vue'),
        },
        {
          path: '/affiliate/reward',
          name: 'affiliate-reward',
          component: () => import('../pages/affiliate/RewardView.vue'),
        },
        {
          path: '/affiliate/codes',
          name: 'affiliate-referral-codes-friends',
          component: () => import('../pages/affiliate/ReferralCodesFriendsView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((_to, _from, next) => {
  const appStore = useAppStore()
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  // const key = authStore.getAccessToken // storage.getItem('accessToken')
  console.log('isAuthenticated', isAuthenticated.value)
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
  if (isAuthenticated.value) {
    authStore.initWebSocket()
  }

  // Ensure loader is not masking the login screen
  if (_to.path === '/login') {
    appStore.hideLoading()
  }

  if (!isAuthenticated.value && _to.path !== '/login' && _to.path !== '/games/redtiger') {
    next('/login')
  } else {
    next()
  }
})

export default router
