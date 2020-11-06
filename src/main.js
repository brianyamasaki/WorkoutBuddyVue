import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import store from './store';
import WorkoutPage from './pages/WorkoutPage.vue';
import IdeasPage from './pages/IdeasPage.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './pageStyle.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WorkoutPage },
    { path: '/ideas', component: IdeasPage }
  ]
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
