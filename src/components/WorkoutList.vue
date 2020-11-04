<template>
  <ul>
<!--    <WorkoutLine :workoutItem="list[0]" /> -->
    <WorkoutLine v-for="item in list" :key="item.id" :workoutItem="item" />
  </ul>
</template>

<script>
import WorkoutLine from './WorkoutLine.vue'

export default {
  name: 'WorkoutList',
  props: {
    list: Array
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
</style>