import firebase from 'firebase/app';

const state = () => ({
  authToken: null,
  googleProvider: null,
  user: null,
  errorMessage: '',
  db: null,
  usersCollection: null
});

const getters = {
  getAuthToken: (state) => state.authToken,
  getAuthInfo: (state) => state.userInfo,
  getErrorMessage: (state) => state.errorMessage
};
const mutations = {
  setGoogleProvider(state, provider) {
    state.googleProvider = provider;
  },
  setTokenAndUserInfo(state, authToken, userInfo) {
    state.authToken = authToken;
    state.userInfo = userInfo;
  },
  setErrors(state, errorMessage) {
    state.errorMessage = errorMessage;
  }
};
const actions = {
  signinGoogle({ state, commit }) {
    let provider = state.googleProvider;
    if (!provider) {
      console.log(firebase.auth);
      provider = firebase.auth.GoogleAuthProvider();
      commit('setGoogleProvider', provider);
    }
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        commit(
          'setTokenAndUserInfo',
          result.credential.accessToken,
          result.user
        );
      })
      .catch((error) => {
        commit('setErrors', error.errorMessage);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
