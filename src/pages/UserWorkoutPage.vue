<template>
  <div>
    <h3>{{ workout.description }}</h3>
    <Exercises :exercises="workout.exercises" :workoutId="workout.id" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Exercises from "../components/Exercises";

export default {
  name: "UserWorkoutPage",
  data: function () {
    return {
      workout: {
        description: "",
        exercises: [],
      },
    };
  },
  methods: {
    ...mapGetters(["getWorkouts"]),
  },
  mounted: function () {
    const workoutId = this.$route.params.id;
    const workouts = this.getWorkouts();
    this.workout = workouts.find((workout) => workout.id === workoutId);
  },
  components: {
    Exercises,
  },
};
</script>