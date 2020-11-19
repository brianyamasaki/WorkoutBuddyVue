import Vue from 'vue';
import firebase from 'firebase/app';
import router from '../../routes';
import { db } from '../../plugins/firebase';

const getEmptyExercise = () => {
  return {
    id: 0,
    description: '',
    sets: 0,
    reps: 0,
    weight: 40
  };
};

function nextListId(list) {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
}

const defaultWorkout = () => {
  return {
    description: '',
    type: '',
    exercises: [getEmptyExercise()]
  };
};

const commitUser = (commit, user) => {
  if (user) {
    const workouts = [];
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        commit('setUser', doc.exists ? doc.data() : null);
        const collectionRef = doc.ref.collection('workouts');

        collectionRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const workout = doc.data();
            workout.id = doc.id;
            if (!workout.exercises) {
              workout.exercises = [getEmptyExercise()];
            }
            workouts.push(workout);
          });
          commit('setWorkouts', workouts);
        });
      });
  }
};

const state = () => ({
  auth: null /* user data from firebase */,
  user: null /* user data from user table */,
  workouts: [defaultWorkout()],
  errorMessage: ''
});

const getters = {
  getAuthInfo: (state) => state.auth,
  getUserInfo: (state) => state.user,
  getUserErrorMessage: (state) => state.errorMessage,
  getTemplateWorkout: (state) => {
    return state.workouts.filter((workout) => workout.type === 'template');
  },
  getWorkouts: (state) => {
    return state.workouts.filter((workout) => workout.type != 'template');
  }
};

const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setAuthError(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setUser(state, user) {
    state.user = user;
  },
  setWorkouts(state, workouts) {
    state.workouts = workouts;
  },
  addExercise(state) {
    const workout = state.workouts[0];
    const newExercise = getEmptyExercise();
    newExercise.id = nextListId(workout.exercises);
    workout.exercises.push(newExercise);
  }
};

const actions = {
  createAccount({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        commitUser(commit, user);
      }
    });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Vue.nextTick(() => {
          router.push('/account');
        });
      })
      .catch((error) => {
        console.log(error.message);
        commit('setAuthError', error.message);
        commit('setAuth', null);
      });
  },
  signIn({ commit }, { email, password }) {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        commitUser(commit, user);
      }
    });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Vue.nextTick(() => {
          router.push('/account');
        });
      })
      .catch((error) => {
        commit('setAuthError', error.message);
        commit('setAuth', null);
      });
  },
  signOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setAuthError', '');
        commit('setAuth', null);
        commit('setUser', null);
        router.push('/login');
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
  },
  setUserInfo({ commit }, auth) {
    commit('setAuth', auth);
  },
  addWorkoutExercise({ commit }) {
    commit('addExercise');
  },
  saveWorkout({ state }, id) {
    const workout = state.workouts.find((workout) => workout.id === id);
    const workoutRef = db.collection(`users/${state.auth.uid}/workouts`);
    workoutRef.doc(id).set(workout);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
