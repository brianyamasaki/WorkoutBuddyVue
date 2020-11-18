<template>
  <div>
    <h3>{{workout.description</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserWorkoutPage',
  data: function() {
    return {
      workout: {}
    }
  },
  methods: {
    ...mapGetters(['getWorkout'])
  },
  mounted: function() {
    this.workouts = this.getWorkout(this.$route.id);
  }
}
</script>