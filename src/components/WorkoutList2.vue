<template>
  <div>
    <ul>
      <WorkoutLine :titleLine=true :workoutItem="getWorkout" />
      <WorkoutLine v-for="item in getWorkout" :key="item.id" :workoutItem="item" :editable="editable" :titleLine=false />
    </ul>
    <button class="btn btn-secondary btn-lg" @click="addWorkoutExercise">Add</button>
    <button class="btn btn-secondary btn-lg" @click="toggleEditable">Edit Workout</button>
    <button class="btn btn-secondary btn-lg" @click="saveWorkout">Save</button>
  </div>
</template>

<script>
import WorkoutLine from './WorkoutLine.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkoutList2',
  computed: mapGetters(['getWorkout']),
  methods: {
    ...mapActions(['addWorkoutExercise', 'saveWorkout']),
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