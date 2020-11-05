import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import WorkoutPage from './pages/WorkoutPage.vue';
import IdeasPage from './pages/IdeasPage.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

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
