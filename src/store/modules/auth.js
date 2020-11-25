import firebase from 'firebase/app';
import router from '../../routes';
import { db } from '../../plugins/firebase';

const authStateChange = (fbAuth, commit) => {
  fbAuth.onAuthStateChanged((auth) => {
    if (auth) {
      commit('setAuthError', '');
      commit('setAuth', auth);
      db.collection('users')
        .doc(auth.uid)
        .get()
        .then((userDoc) => {
          commit('setUser', userDoc.exists ? userDoc.data() : null);
          if (router.currentRoute !== '/workouts') {
            router.push('/workouts');
          }
        });
    } else {
      commit('setAuth', null);
      commit('setUser', null);
      commit('setAuthError', '');
      commit('setWorkouts', []);
      if (router.currentRoute !== '/login') {
        router.push('/login');
      }
    }
  });
};

const state = () => ({
  auth: null /* user data from firebase */,
  user: null /* user data from user table */,
  authErrorMsg: ''
});

const getters = {
  getAuthInfo: (state) => state.auth,
  getUserInfo: (state) => state.user,
  getAuthErrorMessage: (state) => state.authErrorMsg
};

const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setAuthError(state, authErrorMsg) {
    state.authErrorMsg = authErrorMsg;
  },
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  createAccount({ commit }, { email, password }) {
    const fbAuth = firebase.auth();
    authStateChange(fbAuth, commit);
    fbAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.message);
      commit('setAuthError', error.message);
      commit('setAuth', null);
    });
  },
  signIn({ commit }, { email, password }) {
    const fbAuth = firebase.auth();
    authStateChange(fbAuth, commit);
    fbAuth.signInWithEmailAndPassword(email, password).catch((error) => {
      commit('setAuthError', error.message);
      commit('setAuth', null);
    });
  },
  signOut({ commit }) {
    firebase
      .auth()
      .signOut()
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
  },
  resetAuthError({ commit }) {
    commit('setAuthError', null);
  },
  sendPasswordReset(context, email) {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  setUserInfo({ commit }, auth) {
    commit('setAuth', auth);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
