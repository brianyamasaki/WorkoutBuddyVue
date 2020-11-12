import VueRouter from 'vue-router';

import WorkoutPage from './pages/WorkoutPage.vue';
import CreateAccountPage from './pages/CreateAccountPage.vue';
import LoginPage from './pages/LoginPage.vue';
import IdeasPage from './pages/IdeasPage.vue';
import UsersPage from './pages/UsersPage.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WorkoutPage, name: 'home' },
    { path: '/users', component: UsersPage, name: 'users' },
    {
      path: '/createAccount',
      component: CreateAccountPage,
      name: 'createAccount'
    },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/ideas', component: IdeasPage, name: 'ideas' }
  ]
});

export default router;
