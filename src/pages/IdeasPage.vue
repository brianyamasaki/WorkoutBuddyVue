<template>
  <div class="row justify-content-center text-left">
    <div id="text-container" class="col-6-md col-12-sm">
      <h1>Ideas for future releases</h1>
      <ul>
        <li v-for="idea in ideas" :key="idea"> {{idea}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const ideas = [
  'allow manual and automatic sorting of workout items',
  'allow aerobic vs. weight items',
  'allow saving of adjustments for weight machines',
  'different workouts per day of week',
  'calendar to record workouts completed',
  'integration with calendar apps',
  'allow login and server storage'
];

export default {
  name: 'IdeasPage',
  data: function () {
    return {ideas};
  }
}
</script>

<style scoped>
 #text-container {
   padding: 1em;
   background-color: rgba(255, 255, 255, 0.7);
   border-radius: 1em;
 }
</style>