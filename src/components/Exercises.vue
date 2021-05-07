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
    <b-modal ref="done-popup" ok-only ok-title="Reset Workout" @ok="hideModal">
      <div class="d-block text-center">
        <h3>Congrats on your gains! Workout complete!</h3>
      </div>
    </b-modal>
    <div v-if="isAllDone"></div>
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
    isAllDone() {
      for (let i = 0; i < this.exercises.length; i++) {
        if (!this.exercises[i].done) {
          return false;
        }
      }
      const modalCheck = this.$refs["done-popup"];
      if (modalCheck) {
        modalCheck.show();
      }
      return true;
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
    hideModal() {
      for (let i = 0; i < this.exercises.length; i++) {
        this.exercises[i].done = false;
      }
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
  padding-left: 0;
}

button {
  margin: 0 0.5em;
}
.editable-color {
  color: red;
}
</style>