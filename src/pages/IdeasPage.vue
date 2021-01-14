<template>
  <div class="row justify-content-center text-left">
    <div id="text-container" class="col-6-md col-12-sm">
      <h1>Ideas for future releases</h1>
      <ul>
        <li v-for="idea in ideas" :key="idea">{{ idea }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const ideas = [
  'integration with calendar apps',
  'add a streak feature/point system',
  "allow manual and automatic sorting of workout items",
  "allow aerobic vs. weight items",
  "Add PDF of workouts and descriptions",
  "add a 'workout completed' message when all check boxes are done",
  "When you open workout have a master side and a 'today's workout' side"
];

export default {
  name: "IdeasPage",
  data: function () {
    return { ideas };
  },
};
</script>

<style scoped>
#text-container {
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1em;
}
</style>