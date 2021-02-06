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
  props: {
    isMasterWorkout: Boolean,
  },
  data: function () {
    return {
      workout: null,
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
    editing() {
      return this.isEditingWorkout() ? true : false;
    },
  },
  methods: {
    ...mapGetters(["getWorkouts", "isEditingWorkout", "getMasterWorkouts"]),
    ...mapMutations(["setWorkoutTitle", "setWorkoutDescription"]),
    // called every time the input field for the title is changed.
    onChangeTitle(evt) {
      this.setWorkoutTitle({
        title: evt.target.value,
        workout: this.workout,
      });
    },
    // called every time the input field for the description is changed
    onChangeDescription(evt) {
      this.setWorkoutDescription({
        description: evt.target.value,
        workout: this.workout,
      });
    },
    setWorkout(workoutId) {
      const masterWorkouts = this.getMasterWorkouts();
      this.workout = masterWorkouts.find((workout) => workout.id === workoutId);
      if (!this.workout) {
        const dailyWorkouts = this.getWorkouts();
        this.workout = dailyWorkouts.find(
          (workout) => workout.id === workoutId
        );
      }
      return this.workout;
    },
  },
  mounted: function () {
    const workoutId = this.$route.params.id;
    // at this point, we don't know if this is a master workout or a daily workout.
    // so search through both.
    this.setWorkout(workoutId);
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