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
      </div>
      <b-form-checkbox
        class="text-center"
        v-model="workout.type"
        value="template"
        unchecked-value="daily"
      >
        Template
      </b-form-checkbox>
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
        type: "daily",
      },
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
  border: 1px solid #666;
  border-radius: 1rem;
  padding: 1rem;
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

.custom-checkbox {
  margin-top: 0.5rem;
}
</style>