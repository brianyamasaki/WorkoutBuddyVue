<template>
  <div class="new-workout text-left">
    <b-form @submit="onSubmit">
      <div class="flex">
        <div class="title">
          <b-form-input
            type="text"
            v-model="workout.title"
            placeholder="Title"
            required
          />
        </div>
        <div class="description">
          <b-form-input
            type="text"
            v-model="workout.description"
            placeholder="Description"
            required
          />
        </div>
        <b-form-select v-model="workout.type" :options="options" />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Add Workout</button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewWorkoutForm",
  props: {
    fnDone: Function,
  },
  data: function () {
    return {
      workout: {
        title: "",
        description: "",
        type: "template",
      },
      options: [
        { value: "template", text: "Template" },
        { value: "daily", text: "Actual Workout" },
      ],
    };
  },
  methods: {
    ...mapActions(["addNewWorkout"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.addNewWorkout(this.workout);
      this.fnDone();
    },
  },
};
</script>

<style scoped>
.new-workout {
  margin: 1em 0;
}
.flex {
  display: flex;
  justify-content: space-evenly;
}

.flex div {
  flex: 2;
  margin: 0 0.5em;
}

.flex .description {
  flex: 3;
}

select {
  flex: 1;
}

button {
  margin: 1em 0 0 0;
}
</style>