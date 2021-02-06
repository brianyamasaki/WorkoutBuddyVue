import { db } from '../../plugins/firebase';

// Action - Add an empty exercise to a workout
const addWorkoutExercise = ({ commit }, workoutId) => {
  commit('addExercise', workoutId);
};

// Action - Remove a specific exercise from a specific workout
const removeWorkoutExercise = (
  { commit, state },
  { workoutId, exerciseId }
) => {
  // iterate through workouts until we find the target workout
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
  const { workout, collectionName } = findWorkout(state, workoutId);
  const workoutRef = db.collection(
    `users/${state.auth.auth.uid}/${collectionName}`
  );
  return workoutRef.doc(workoutId).set(workout, { merge: true });
};

// Action - Create a new empty workout with given fields given in the workout payload
// Note that state.workouts will get automatically updated by Firestore's bindUser binding
const addNewWorkout = ({ state }, workoutDetails) => {
  const newWorkout = {
    ...defaultWorkout(),
    ...workoutDetails,
  };
  return db.collection(`users/${state.auth.auth.uid}/workouts`).add(newWorkout);
};

// Action - Create a new empty workout with given fields given in the workout payload
// Note that state.masterWorkouts will get automatically updated by Firestore's bindUser binding
const addNewMasterWorkout = ({ state }, workoutDetails) => {
  const newWorkout = {
    ...defaultWorkout(),
    ...workoutDetails,
  };
  return db
    .collection(`users/${state.auth.auth.uid}/masterWorkouts`)
    .add(newWorkout);
};
// Action - remove a workout
// Note that state.workouts will get automatically updated by Firestore's bindUser binding
const removeWorkout = ({ state }, workoutId) => {
  const { collectionName } = findWorkout(state, workoutId);
  return db
    .collection(`users/${state.auth.auth.uid}/${collectionName}`)
    .doc(workoutId)
    .delete();
};

// Action - set workout editing state
const setEditingWorkout = ({ commit }, isEditing) => {
  commit('editingWorkout', isEditing);
};

// Action - get legacy workout from localStorage and create a workout in the account
const transferLegacyWorkout = ({ state }) => {
  const exercises = JSON.parse(localStorage.getItem('workoutList'));
  const newWorkout = {
    title: 'Transferred Legacy Workout',
    description: 'A workout originally created without an account',
    exercises,
  };
  return db.collection(`users/${state.auth.auth.uid}/workouts`).add(newWorkout);
};

// Action - copy workouts to master workouts
const copyWorkoutToMasterWorkouts = ({ state }, workoutId) => {
  // get workouts and add them to masterWorkouts
  // Note that Object.assign copies data from the returned workout into a fresh new object,
  // so we can modify this new object without affecting the original workout,
  let { workout } = findWorkout(state, workoutId);
  workout = Object.assign({}, workout);
  workout.template = true;
  workout.id = null;
  const { uid } = state.auth.auth;
  db.collection(`users/${uid}/masterWorkouts`)
    .add(workout)
    .then((docRef) => {
      docRef.update({
        id: docRef.id,
        template: true,
      });
      console.log(docRef);
    });
};

export const workoutActions = {
  addWorkoutExercise,
  removeWorkoutExercise,
  saveWorkout,
  addNewWorkout,
  addNewMasterWorkout,
  removeWorkout,
  setEditingWorkout,
  transferLegacyWorkout,
  copyWorkoutToMasterWorkouts,
};

// Mutator - Atomic action to modify state.workouts
const setWorkouts = (state, workouts) => {
  state.workouts = workouts;
};

// Mutator - Atomic action to modify state.workouts to add Exercise
const addExercise = (state, workoutId) => {
  const { workout } = findWorkout(state, workoutId);
  if (workout) {
    const newExercise = getEmptyExercise();
    newExercise.id = nextListId(workout.exercises);
    workout.exercises.push(newExercise);
  }
};

// Mutator - sets editing flag
const editingWorkout = (state, isEditing) => {
  state.fEditingWorkout = isEditing;
};

// Mutator - finds specified workout and sets the title
const setWorkoutTitle = (state, { workout, title }) => {
  if (workout && title) {
    workout.title = title;
  }
};

// Mutator - finds specific workout and sets the description
// Note that we don't write to the DB since we expect the user to save to DB similar to changing an exercise
const setWorkoutDescription = (state, { workout, description }) => {
  if (workout && description) {
    workout.description = description;
  }
};

export const workoutMutations = {
  setWorkouts,
  addExercise,
  editingWorkout,
  setWorkoutTitle,
  setWorkoutDescription,
};

// utility functions below

// return a specific workout
const findWorkout = (state, workoutId) => {
  let isMasterWorkout = false;
  let foundWorkout = state.workouts.find((workout) => workoutId === workout.id);
  if (!foundWorkout) {
    foundWorkout = state.masterWorkouts.find(
      (workout) => workoutId === workout.id
    );
    if (foundWorkout) {
      isMasterWorkout = true;
    }
  }
  return {
    workout: foundWorkout,
    isMasterWorkout,
    collectionName: isMasterWorkout ? 'masterWorkouts' : 'workouts',
  };
};

// Basic, empty exercise
const getEmptyExercise = () => {
  return {
    id: 0,
    description: '',
    sets: 0,
    reps: 0,
    weight: 40,
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
    exercises: [getEmptyExercise()],
  };
};
