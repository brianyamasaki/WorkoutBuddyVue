import firebase from 'firebase/app';
import router from '../../routes';
import { db } from '../../plugins/firebase';

const state = () => ({
  user: null,
  errorMessage: ''
});

const getters = {
  getUserInfo: (state) => state.user,
  getUserErrorMessage: (state) => state.errorMessage
};
const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  },
  setAuthError(state, errorMessage) {
    state.errorMessage = errorMessage;
  }
};

const actions = {
  createAccount({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        console.log(error.message);
        commit('setAuthError', error.message);
        commit('setAuthUser', null);
      });
  },
  signIn({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push({ path: '/users' });
      })
      .catch((error) => {
        commit('setAuthError', error.message);
        commit('setAuthUser', null);
      });
  },
  signOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setAuthError', '');
        router.push('login');
      })
      .catch((error) => {
        commit('setAuthError', error.message);
      });
  },
  addToUserTable(context, payload) {
    if (payload.uid) {
      db.collection('users')
        .doc(payload.uid)
        .set(payload, { merge: true })
        .then(() => {
          console.log('user table updated');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
