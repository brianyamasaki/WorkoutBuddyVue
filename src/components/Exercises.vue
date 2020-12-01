<template>
  <div>
    <ul>
      <WorkoutLine :titleLine="true" />
      <WorkoutLine
        v-for="item in exercises"
        :key="item.id"
        :workoutItem="item"
        :editable="isEditingWorkout()"
        :titleLine="false"
        :workoutId="workoutId"
      />
    </ul>
    <button
      v-if="isEditingWorkout"
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Exercises",
  props: {
    exercises: Array,
    workoutId: String,
  },
  computed: {
    editableBtnText() {
      return this.isEditingWorkout() ? "View Workout" : "Edit Workout";
    },
  },
  methods: {
    ...mapGetters(["isEditingWorkout"]),
    ...mapActions(["addWorkoutExercise", "saveWorkout", "setEditingWorkout"]),
    addExercise() {
      this.addWorkoutExercise(this.workoutId);
      this.changed = true;
    },
    toggleEditable() {
      this.setEditingWorkout(!this.isEditingWorkout());
    },
    save() {
      this.saveWorkout(this.workoutId);
    },
  },
  data: function () {
    return {
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