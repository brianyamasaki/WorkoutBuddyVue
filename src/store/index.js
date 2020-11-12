import Vuex from 'vuex';
import Vue from 'vue';

import { vuexfireMutations, firestoreAction } from 'vuexfire';
import workout from './modules/workout';
import { db } from '../plugins/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  },
  mutations: vuexfireMutations,
  actions: {
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('users', db.collection('users'));
    }),
    addUser: firestoreAction((context, payload) => {
      return db.collection('users').add(payload);
    }),
    deleteUser: firestoreAction((context, payload) => {
      db.collection('users')
        .doc(payload)
        .delete();
    }),
    updateNote: firestoreAction((context, payload) => {
      db.collection('users')
        .doc(payload.id)
        .set(payload);
    })
  },
  modules: {
    workout
  }
});
