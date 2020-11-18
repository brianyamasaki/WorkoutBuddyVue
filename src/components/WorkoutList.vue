<template>
  <div>
    <ul>
      <WorkoutLine :titleLine=true :workoutItem="allWorkoutItems[0]" />
      <WorkoutLine v-for="item in allWorkoutItems" :key="item.id" :workoutItem="item" :editable="editable" :titleLine=false />
    </ul>
    <button class="btn btn-secondary btn-lg" @click="addWorkoutItem">Add</button>
    <button class="btn btn-secondary btn-lg" @click="toggleEditable">Edit Workout</button>
    <button class="btn btn-secondary btn-lg" @click="saveWorkoutList">Save</button>
  </div>
</template>

<script>
import WorkoutLine from './WorkoutLine.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkoutList',
  created: function() { 
    this.loadWorkoutList();
  },
  computed: mapGetters(['allWorkoutItems']),
  methods: {
    ...mapActions(['addWorkoutItem', 'loadWorkoutList', 'saveWorkoutList']),
    toggleEditable() {
      this.editable = !this.editable;
    }
  },
  data: function() {
    return {
      editable: false
    }
  },
  components: {
    WorkoutLine
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }

  button {
    margin: 0 0.5em;
  }
</style>