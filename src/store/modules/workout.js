// This is the legacy, soon to be deprecated workouts that we store in a browser
// It's stored in an individual browser, so using a different computer would not be remembered.
function getEmptyItem() {
  return {
    id: 0,
    description: '',
    sets: 0,
    reps: 0,
    weight: 0,
  };
}

function nextListId(list) {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
}

const state = {
  list: [getEmptyItem()],
};

const getters = {
  allWorkoutItems: (state) => state.list,
};

const actions = {
  removeWorkoutItem({ commit }, idDel) {
    commit('deleteItem', idDel);
  },
  addWorkoutItem({ commit }) {
    commit('addNewItem');
  },
  saveWorkoutList({ state }) {
    localStorage.setItem('workoutList', JSON.stringify(state.list));
  },
  loadWorkoutList({ commit }) {
    const list = JSON.parse(localStorage.getItem('workoutList'));
    commit('setWorkoutList', list);
  },
};

const mutations = {
  setWorkoutList(state, list) {
    state.list = list || [getEmptyItem()];
  },
  addNewItem(state) {
    const newItem = getEmptyItem();
    newItem.id = nextListId(state.list);
    state.list.push(newItem);
  },
  deleteItem(state, idDel) {
    // JavaScript magic that says
    // iterate through the state.list and create an array of all items that don't have id === idDel
    // then save this new list into state.list
    state.list = state.list.filter((item) => item.id !== idDel);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
