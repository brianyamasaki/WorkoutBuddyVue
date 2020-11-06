<template>
  <div class="workout-line text-left" >
    <div class="description">
      <div v-if="titleLine" class="titleLine">Description</div>
      <input v-else :class="{ 'non-editable' : !editable}" :[readonly]="readonly" type="text" v-model="workoutItem.description" placeholder="Description" />
    </div>
    <div class="sets">
      <div v-if="titleLine" class="titleLine">Sets</div>
      <input v-else :class="{ 'non-editable' : !editable}" :[readonly]="readonly" type="number" v-model="workoutItem.sets" placeholder="Sets" min="1" />
    </div>
    <div class="reps">
      <div v-if="titleLine" class="titleLine">Reps</div>
      <input v-else :class="{ 'non-editable' : !editable}" :[readonly]="readonly" class="reps" type="number" v-model="workoutItem.reps" placeholder="Reps" min="1" />
    </div>
    <div class="weight">
      <div v-if="titleLine" class="titleLine">Weight</div>
      <input v-else :class="{ 'non-editable' : !editable}" :[readonly]="readonly" class="weight" type="number" v-model="workoutItem.weight" placeholder="Weight or Time" min="0" step="5"/>
    </div>
    <div class="buttons">
      <button v-if="editable" class="btn btn-outline-danger" @click="removeWorkoutItem(workoutItem.id)">X</button>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    workoutItem: Object,
    editable: Boolean,
    titleLine: Boolean
  },
  computed: {
    readonly() {
      return this.editable? 'foo' : 'readonly';
    }
  },
  methods: {
    ...mapActions(['removeWorkoutItem']),
    editableClass() {
      return this.editable ? '' : 'non-editable';
    }
  }
}
</script>

<style scoped>
  .titleLine {
    font-size: 1.2rem;
    font-weight: 700;
  }
  .non-editable {
    background: none;
    border: transparent;
    margin: 2px 0;
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
  .sets {
    flex: 1;
    max-width: 4rem;
  }
  .reps {
    flex: 1;
    max-width: 5rem;
  }
  .weight {
    flex: 1;
    max-width: 5rem;
  }
  .buttons {
    width: 3rem;
  }
</style>