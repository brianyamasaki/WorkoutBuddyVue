import VueRouter from 'vue-router';

import WorkoutPage from './pages/WorkoutPage.vue';
import CreateAccountPage from './pages/CreateAccountPage.vue';
import LoginPage from './pages/LoginPage.vue';
import IdeasPage from './pages/IdeasPage.vue';
import UsersPage from './pages/UsersPage.vue';
import UserAccountPage from './pages/UserAccountPage.vue';
import UserWorkoutsPage from './pages/UserWorkoutsPage.vue';
import UserWorkoutPage from './pages/UserWorkoutPage.vue';
import NotFoundPage from './pages/404Page.vue';

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
    { path: '/account', component: UserAccountPage, name: 'userAccount' },
    { path: '/workouts', component: UserWorkoutsPage, name: 'userWorkouts' },
    { path: '/workouts/:id', component: UserWorkoutPage, name: 'userWorkout' },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/ideas', component: IdeasPage, name: 'ideas' },
    { path: '*', component: NotFoundPage, name: 'notFoundPage' }
  ]
});

export default router;
