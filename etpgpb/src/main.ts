import '@babel/polyfill';
import 'core-js';
import 'normalize.css';

import 'indexeddbshim';
import 'indexeddb-getall-shim';

import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import PortalVue from 'portal-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCompositionAPI);
Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
