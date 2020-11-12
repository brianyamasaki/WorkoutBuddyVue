import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import store from './store';
import router from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './pageStyle.css';

import '@/plugins/firebase';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
