<template>
  <div>
    <h3>{{ workout && workout.description }}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserWorkoutPage",
  data: function () {
    return {
      workout: {},
    };
  },
  methods: {
    ...mapGetters(["getWorkouts"]),
  },
  mounted: function () {
    const workouts = this.getWorkouts();
    this.workout = workouts.find(
      (workout) => workout.id === parseInt(this.$route.params.id, 10)
    );
  },
};
</script>