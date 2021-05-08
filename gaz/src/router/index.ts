import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '@/views/MainPage/MainPage.vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    async beforeEnter (to, from, next) {
      if (!store.state.main.items.length) {
        await store.dispatch('main/loadItems', undefined);
      }
      next();
    },
  },
  {
    path: '/history/removed',
    name: 'HistoryPageRemoved',
    component: () => import(/* webpackChunkName: "history" */ '@/views/HistoryPage/HistoryPage.vue'),
    props: {
      type: 'removed',
    },
  },
  {
    path: '/history/added',
    name: 'HistoryPageAdded',
    component: () => import(/* webpackChunkName: "history" */ '@/views/HistoryPage/HistoryPage.vue'),
    props: {
      type: 'added',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
