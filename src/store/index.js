import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

import { vuexfireMutations, firestoreAction } from 'vuexfire';
import workout from './modules/workout';
import auth from './modules/auth';
import { db } from '../plugins/firebase';
import { workoutActions, workoutMutations } from './modules/fbWorkout';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workouts: []
  },
  plugins: [createPersistedState()],
  getters: {
    getWorkouts: (state) => state.workouts,
    getWorkout: (state) => (workoutId) => {
      console.log(workoutId);
      return state.workouts.find((workout) => workout.id === workoutId);
    }
  },
  mutations: {
    ...vuexfireMutations,
    ...workoutMutations
  },
  actions: {
    ...workoutActions,
    bindWorkouts: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef(
        'workouts',
        db.collection(`users/${uid}/workouts`)
      );
    }),
    unbindWorkouts: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('workouts');
    })
  },
  modules: {
    workout /* temporary localstorage based */,
    auth
  }
});
