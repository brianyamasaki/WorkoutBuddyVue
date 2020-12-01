<template>
  <div>
    <ul>
      <WorkoutLine :titleLine="true" />
      <WorkoutLine
        v-for="item in exercises"
        :key="item.id"
        :workoutItem="item"
        :editable="isEditing"
        :titleLine="false"
        :workoutId="workoutId"
      />
    </ul>
    <button class="btn btn-lg" :class="btnDynamicClasses" @click="addExercise">
      <b-icon icon="plus" scale="1.9"></b-icon>
    </button>
    <button class="btn btn-lg btn-primary" @click="toggleEditable">
      <b-icon icon="pencil-fill" :class="{ 'editable-color': isEditing }" />
    </button>
    <button class="btn btn-lg" :class="btnDynamicClasses" @click="save">
      Save
    </button>
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
    btnDynamicClasses() {
      const editing = this.isEditingWorkout();
      return {
        "btn-secondary": !editing,
        "btn-primary": editing,
      };
    },
    isEditing() {
      return this.isEditingWorkout();
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
.editable-color {
  color: red;
}
</style>