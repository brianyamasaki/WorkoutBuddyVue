<template>
  <div class="workout-line text-left">
    <div class="description">
      <div v-if="titleLine" class="title-line">Description</div>
      <input
        v-else
        :class="{
          'non-editable': !editable,
          'exercise-finished': exerciseFinished,
        }"
        :[readonly]="readonly"
        type="text"
        v-model="workoutItem.description"
        placeholder="Description"
      />
    </div>
    <div class="sets">
      <div v-if="titleLine" class="title-line">Sets</div>
      <input
        v-else
        :class="{
          'non-editable': !editable,
          'exercise-finished': exerciseFinished,
        }"
        :[readonly]="readonly"
        type="number"
        v-model="workoutItem.sets"
        placeholder="Sets"
        min="1"
      />
    </div>
    <div class="reps">
      <div v-if="titleLine" class="title-line">Reps</div>
      <input
        v-else
        :class="{
          'non-editable': !editable,
          'exercise-finished': exerciseFinished,
        }"
        :[readonly]="readonly"
        type="number"
        v-model="workoutItem.reps"
        placeholder="Reps"
        min="1"
      />
    </div>
    <div class="weight">
      <div v-if="titleLine" class="title-line">Weight</div>
      <input
        v-else
        :class="{
          'non-editable': !editable,
          'exercise-finished': exerciseFinished,
        }"
        :[readonly]="readonly"
        type="number"
        v-model="workoutItem.weight"
        placeholder="Weight or Time"
        min="0"
        step="5"
      />
    </div>
    <div class="done">
      <div v-if="titleLine" class="title-line">Done</div>
      <b-form-checkbox
        v-else
        :class="{ 'non-editable': !editable }"
        type="check"
        value="done"
        size="lg"
        v-model="workoutItem.done"
      />
    </div>
    <div class="buttons">
      <button
        v-if="editable"
        class="btn btn-outline-danger btn-sm"
        @click="removeItem(workoutItem.id)"
      >
        <b-icon scale="1.3" icon="slash-circle" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    workoutItem: Object,
    editable: Boolean,
    titleLine: Boolean,
    workoutId: String,
  },
  computed: {
    exerciseFinished() {
      return this.workoutItem.done;
    },
    readonly() {
      return this.editable ? "foo" : "readonly";
    },
  },
  methods: {
    ...mapActions(["removeWorkoutItem", "removeWorkoutExercise"]),
    ...mapMutations(["copyWorkoutToMasterWorkouts"]),
    removeItem(exerciseId) {
      if (!this.workoutId) {
        this.removeWorkoutItem(exerciseId);
      } else {
        this.removeWorkoutExercise({
          workoutId: this.workoutId,
          exerciseId,
        });
      }
    },
    editableClass() {
      return this.editable ? "" : "non-editable";
    },
  },
};
</script>

<style scoped>
.title-line {
  font-size: 1.2rem;
  font-weight: 700;
}
.sets .title-line,
.reps .title-line {
  text-align: center;
}
.non-editable {
  background: none;
  border: transparent;
  margin: 2px 0;
}
.exercise-finished {
  color: grey;
  text-decoration: line-through;
  text-decoration-color: red;
}
.workout-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}
.workout-line > div {
  margin-right: 8px;
}
input {
  padding: 5px;
  width: 100%;
}
.description {
  flex: 2;
}
.reps,
.weight,
.sets,
.done {
  flex: 1;
  max-width: 5rem;
}
.sets input,
.reps input,
.done,
.weight input {
  text-align: center;
}
.buttons {
  width: 5rem;
}
</style>