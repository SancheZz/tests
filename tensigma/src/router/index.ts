import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/tiles',
    name: 'Tiles',
    component: () => import(/* webpackChunkName: "tiles" */ '../views/TilesPage/TilesPage.vue'),
  },
  {
    path: '/blockchain',
    name: 'Blockchain',
    component: () => import(/* webpackChunkName: "blockchain" */ '../views/BlockchainPage/BlockchainPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
