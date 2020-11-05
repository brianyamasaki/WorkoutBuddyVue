<template>
  <div class="workout-line">
    <input class="description" type="text" v-model="workoutItem.description" placeholder="Description"/>
    <input class="sets" type="number" v-model="workoutItem.sets" placeholder="Sets" min="1" />
    <input class="reps" type="number" v-model="workoutItem.reps" placeholder="Reps" min="1" />
    <input class="weight" type="number" v-model="workoutItem.weight" placeholder="Weight or Time" min="0" step="5"/>
    <button class="btn btn-outline-danger" @click="removeWorkoutItem(workoutItem.id)">X</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    workoutItem: Object
  },
  methods: mapActions(['removeWorkoutItem'])
}
</script>

<style scoped>
  .workout-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  .workout-line input {
    margin:0 0.25rem;
  }
  .description {
    flex: 2;
  }
  .sets {
    max-width: 4rem;
  }
  .reps {
    max-width: 5rem;
  }
  .weight {
    max-width: 5rem;
  }
</style>