<template>
  <div>
    <div>
      <input
        v-if="editing"
        class="workout-title"
        :value="workoutTitle"
        @change="onChangeTitle"
        type="text"
        name="title"
        id="title"
      />
      <h3 v-else>{{ workoutTitle }}</h3>
    </div>
    <div>
      <input
        v-if="editing"
        class="workout-description"
        :value="workoutDescription"
        @change="onChangeDescription"
        type="text"
        name="description"
        id="description"
      />
      <p v-else>{{ workoutDescription }}</p>
    </div>
    <Exercises :exercises="workoutExercises" :workoutId="workoutId" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
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
    editing() {
      return this.isEditingWorkout() ? true : false;
    },
  },
  methods: {
    ...mapGetters(["getWorkouts", "isEditingWorkout"]),
    ...mapMutations(["setWorkoutTitle", "setWorkoutDescription"]),
    onChangeTitle(evt) {
      console.log(evt.target.value);
      this.setWorkoutTitle({
        title: evt.target.value,
        workoutId: this.$route.params.id,
      });
    },
    onChangeDescription(evt) {
      this.setWorkoutDescription({
        description: evt.target.value,
        workoutId: this.$route.params.id,
      });
    },
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

<style scoped>
.workout-description {
  width: 90%;
  text-align: center;
  padding: 4px;
}
.workout-title {
  width: 50%;
  min-width: 20em;
  text-align: center;
  padding: 4px;
  font-size: 130%;
  font-weight: 700;
}
</style>