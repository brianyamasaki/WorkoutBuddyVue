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

export const nextListId = (list) => {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
};

export const defaultWorkout = () => {
  return {
    description: '',
    type: '',
    exercises: [getEmptyExercise()]
  };
};

const addWorkoutExercise = ({ commit }, workoutId) => {
  commit('addExercise', workoutId);
};

const saveWorkout = ({ state }, workoutId) => {
  const workout = state.workouts.find((workout) => workout.id === workoutId);
  const workoutRef = db.collection(`users/${state.auth.auth.uid}/workouts`);
  workoutRef.doc(workoutId).set(workout, { merge: true });
};

const addNewWorkout = ({ commit }, workout) => {
  commit('addWorkout', workout);
};

export const workoutActions = {
  addWorkoutExercise,
  saveWorkout,
  addNewWorkout
};

const setWorkouts = (state, workouts) => {
  state.workouts = workouts;
};

const addExercise = (state, workoutId) => {
  const workout = state.workouts.find((workout) => workoutId === workout.id);
  if (workout) {
    const newExercise = getEmptyExercise();
    newExercise.id = nextListId(workout.exercises);
    workout.exercises.push(newExercise);
  }
};

const addWorkout = (state, workout) => {
  const newWorkout = {
    ...defaultWorkout(),
    ...workout
  };
  return db.collection(`users/${state.auth.auth.uid}/workouts`).add(newWorkout);
};

export const workoutMutations = {
  setWorkouts,
  addExercise,
  addWorkout
};
