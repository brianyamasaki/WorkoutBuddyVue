import VueRouter from 'vue-router';

import WorkoutPage from './pages/WorkoutPage.vue';
import CreateAccountPage from './pages/CreateAccountPage.vue';
import LoginPage from './pages/LoginPage.vue';
import IdeasPage from './pages/IdeasPage.vue';
import UsersPage from './pages/UsersPage.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: WorkoutPage, name: 'Home' },
    { path: '/users', component: UsersPage, name: 'Users' },
    {
      path: '/createAccount',
      component: CreateAccountPage,
      name: 'Create Account'
    },
    { path: '/login', component: LoginPage, name: 'Login' },
    { path: '/ideas', component: IdeasPage, name: 'Ideas' }
  ]
});

export default router;
