<template>
  <div>
    <h3>{{ workoutTitle }}</h3>
    <p>{{ workoutDescription }}</p>
    <Exercises :exercises="workoutExercises" :workoutId="workoutId" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Exercises from "../components/Exercises";

export default {
  name: "UserWorkoutPage",
  data: function () {
    return {
      workoutIndex: null,
    };
  },
  computed: {
    workoutTitle() {
      if (!this.workout) {
        return "";
      }
      return this.workout.title || "";
    },
    workoutDescription() {
      if (!this.workout) {
        return "";
      }
      return this.workout.description || "";
    },
    workoutExercises() {
      return !this.workout ? [] : this.workout.exercises;
    },
    workoutId() {
      return !this.workout ? "" : this.workout.id;
    },
    workout() {
      const workouts = this.getWorkouts();
      return workouts[this.workoutIndex];
    },
  },
  methods: {
    ...mapGetters(["getWorkouts"]),
  },
  mounted: function () {
    const workoutId = this.$route.params.id;
    const workouts = this.getWorkouts();
    this.workoutIndex = workouts.findIndex(
      (workout) => workout.id === workoutId
    );
  },
  components: {
    Exercises,
  },
};
</script>