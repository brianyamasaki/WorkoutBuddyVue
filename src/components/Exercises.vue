<template>
  <div>
    <ul>
      <WorkoutLine :titleLine="true" />
      <WorkoutLine
        v-for="item in exercises"
        :key="item.id"
        :workoutItem="item"
        :editable="editable"
        :titleLine="false"
        :workoutId="workoutId"
      />
    </ul>
    <button
      v-if="editable"
      class="btn btn-secondary btn-lg"
      @click="addExercise"
    >
      Add
    </button>
    <button class="btn btn-secondary btn-lg" @click="toggleEditable">
      {{ editableBtnText }}
    </button>
    <button class="btn btn-secondary btn-lg" @click="save">Save</button>
  </div>
</template>

<script>
import WorkoutLine from "./WorkoutLine.vue";
import { mapActions } from "vuex";

export default {
  name: "Exercises",
  props: {
    exercises: Array,
    workoutId: String,
  },
  computed: {
    editableBtnText() {
      return this.editable ? "View Workout" : "Edit Workout";
    },
  },
  methods: {
    ...mapActions(["addWorkoutExercise", "saveWorkout"]),
    addExercise() {
      this.addWorkoutExercise(this.workoutId);
      this.changed = true;
    },
    toggleEditable() {
      this.editable = !this.editable;
    },
    save() {
      this.saveWorkout(this.workoutId);
    },
  },
  data: function () {
    return {
      editable: false,
      changed: false,
    };
  },
  components: {
    WorkoutLine,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

button {
  margin: 0 0.5em;
}
</style>