<template>
  <div id="workout-buddy-root">
    <b-container fluid="md">
      <MenuBar brand="WORKOUT BUDDY" />
      <router-view />
    </b-container>
  </div>
</template>

<script>
import MenuBar from "./components/MenuBar.vue";

export default {
  name: "App",
  components: {
    MenuBar,
  },
};
</script>

<style>
#workout-buddy-root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
