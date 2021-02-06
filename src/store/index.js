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
    workouts: [],
    masterWorkouts: [],
    fEditingWorkout: false,
  },
  plugins: [createPersistedState()],
  getters: {
    getWorkouts: (state) => state.workouts,
    getWorkout: (state) => (workoutId) => {
      return state.workouts.find((workout) => workout.id === workoutId);
    },
    isEditingWorkout: (state) => {
      return state.fEditingWorkout;
    },
    getMasterWorkouts: (state) => state.masterWorkouts,
    getMasterWorkout: (state) => (workoutId) => {
      return state.masterWorkouts.find((workout) => workout.id === workoutId);
    },
  },
  mutations: {
    ...vuexfireMutations,
    ...workoutMutations,
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
    }),
    bindMasterWorkouts: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef(
        'masterWorkouts',
        db.collection(`users/${uid}/masterWorkouts`)
      );
    }),
    unbindMasterWorkouts: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('masterWorkouts');
    }),
  },
  modules: {
    workout /* temporary localstorage based */,
    auth,
  },
});
