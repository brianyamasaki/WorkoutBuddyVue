<template>
  <div id="app">
    <MenuBar brand="WORKOUT BUDDY" />
    <div class="container">
      <WorkoutList :list="workoutItems" />
      <button class="btn btn-secondary" @click="addWorkoutItem">Add</button>
    </div>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import WorkoutList from './components/WorkoutList'

export default {
  name: 'App',
  data: function() {
    return {
      workoutItems: [{ id: 0, description: 'Curls', sets: 3, reps: 20, weight: 150 }]
    } 
  },
  components: {
    MenuBar,
    WorkoutList
  },
  methods: {
    nextId() {
      let maxId = 0;
      let item;
      let i;
      for (i=0; i < this.workoutItems.length; i++) {
        item = this.workoutItems[i];
        if (item.id > maxId) {
          maxId = item.id;
        }
      }
      return maxId + 1;
    },

    addWorkoutItem() {
      this.workoutItems.push({
        id: this.nextId(), 
        description:'',
        sets: 0,
        reps: 0,
        weight: 150
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
