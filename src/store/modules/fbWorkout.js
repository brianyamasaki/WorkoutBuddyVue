import { db } from '../../plugins/firebase';

// Action - Add an empty exercise to a workout
const addWorkoutExercise = ({ commit }, workoutId) => {
  commit('addExercise', workoutId);
};

// Action - Remove a specific workout from a specific workout
const removeWorkoutExercise = (
  { commit, state },
  { workoutId, exerciseId }
) => {
  // iterate through workouts until we find the target work
  // then filter through exercises and create a new
  // array with the exercises excluding the passed in exerciseId
  const workouts = state.workouts.map((workout) => {
    if (workout.id !== workoutId) {
      return workout;
    }
    const { exercises } = workout;
    workout.exercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId
    );
    return workout;
  });
  commit('setWorkouts', workouts);
};

// Action - Save specific workout from state.workouts out to the external Database
const saveWorkout = ({ state }, workoutId) => {
  const workout = findWorkout(state, workoutId);
  const workoutRef = db.collection(`users/${state.auth.auth.uid}/workouts`);
  workoutRef.doc(workoutId).set(workout, { merge: true });
};

// Action - Create a new empty workout with given fields given in the workout payload
const addNewWorkout = ({ commit }, payload) => {
  commit('addWorkout', payload);
};

// Action - set workout editing state
const setEditingWorkout = ({ commit }, isEditing) => {
  commit('editingWorkout', isEditing);
};

export const workoutActions = {
  addWorkoutExercise,
  removeWorkoutExercise,
  saveWorkout,
  addNewWorkout,
  setEditingWorkout
};

// Mutator - Atomic action to modify state.workouts
const setWorkouts = (state, workouts) => {
  state.workouts = workouts;
};

// Mutator - Atomic action to modify state.workouts to add Exercise
const addExercise = (state, workoutId) => {
  const workout = state.workouts.find((workout) => workoutId === workout.id);
  if (workout) {
    const newExercise = getEmptyExercise();
    newExercise.id = nextListId(workout.exercises);
    workout.exercises.push(newExercise);
  }
};

// Mutator - Atomic action to add workout to list of workouts
// Note that state.workouts will get automatically updated by Firestore's bindUser binding
const addWorkout = (state, workout) => {
  const newWorkout = {
    ...defaultWorkout(),
    ...workout
  };
  return db.collection(`users/${state.auth.auth.uid}/workouts`).add(newWorkout);
};

const editingWorkout = (state, isEditing) => {
  state.fEditingWorkout = isEditing;
};

const setWorkoutTitle = (state, { workoutId, title }) => {
  const workout = findWorkout(state, workoutId);
  if (workout && title) {
    workout.title = title;
  }
};

const setWorkoutDescription = (state, { workoutId, description }) => {
  const workout = findWorkout(state, workoutId);
  if (workout && description) {
    workout.description = description;
  }
};

export const workoutMutations = {
  setWorkouts,
  addExercise,
  addWorkout,
  editingWorkout,
  setWorkoutTitle,
  setWorkoutDescription
};

const findWorkout = (state, workoutId) => {
  return state.workouts.find((workout) => workoutId === workout.id);
};

// Basic, empty exercise
const getEmptyExercise = () => {
  return {
    id: 0,
    description: '',
    sets: 0,
    reps: 0,
    weight: 40
  };
};

// search through exercise list and find an ID number that isn't currently used
export const nextListId = (list) => {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
};

// This is an empty, basic workout with a single, empty exercise
export const defaultWorkout = () => {
  return {
    description: '',
    type: '',
    exercises: [getEmptyExercise()]
  };
};
