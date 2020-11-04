<template>
  <div class="workout-line">
    <input class="description" type="text" @input="onInputDescription" placeholder="Description"/>
    <input class="sets" type="number" @input="onInputSets" placeholder="Sets" min="1" />
    <input class="reps" type="number" @input="onInputReps" placeholder="Reps" min="1" />
    <input class="weight" type="number" @input="onInputWeight" placeholder="Weight or Time" min="0" step="5"/>
  </div>
</template>

<script>
export default {
  props: [],
  data: function () {
    return {
      description: '',
      sets: 1,
      reps: 1,
      weight: 0
    }
  },
  methods: {
    onInputDescription(event) {
      this.description = event.target.value;
    },
    onInputSets(event) {
      this.sets = event.target.value;
    },
    onInputReps(event) {
      this.reps = event.target.value;
    },
    onInputWeight(event) {
      this.reps = event.target.value;
    }
  }
}
</script>

<style scoped>
  .workout-line {
    display: flex;
    justify-content: space-between;
  }
  .workout-line input {
    margin:0 0.25rem;
  }
  .description {
    flex: 2;
  }
  .sets {
    max-width: 3rem;
  }
  .reps {
    max-width: 3rem;
  }
  .weight {
    max-width: 5rem;
  }
</style>