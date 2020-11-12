import firebase from 'firebase/app';
import router from '../../routes';

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

const authStateWatcher = (commit, user) => {
  commit('setAuthUser', user);
};

const actions = {
  createAccount({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          authStateWatcher(commit, user);
        });
        router.push({ path: '/' });
      })
      .catch((error) => {
        commit('setAuthError', error.message);
        commit('setAuthUser', null);
      });
  },
  signIn({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          authStateWatcher(commit, user);
        });
        router.push({ path: '/' });
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
      })
      .catch((error) => {
        commit('setAuthError', error.message);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
