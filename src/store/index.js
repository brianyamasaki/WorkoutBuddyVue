import Vuex from 'vuex';
import Vue from 'vue';
import workout from './modules/workout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    workout
  }
});
