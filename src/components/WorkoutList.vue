<template>
  <div>
    <ul>
  <!--    <WorkoutLine :workoutItem="list[0]" /> -->
      <WorkoutLine v-for="item in allWorkoutItems" :key="item.id" :workoutItem="item" />
    </ul>
    <button class="btn btn-secondary" @click="addWorkoutItem">Add</button>
  </div>
</template>

<script>
import WorkoutLine from './WorkoutLine.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkoutList',
  computed: mapGetters(['allWorkoutItems']),
  methods: mapActions(['addWorkoutItem']),
  components: {
    WorkoutLine
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }
</style>