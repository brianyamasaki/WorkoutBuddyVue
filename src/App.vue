<template>
  <div id="app">
    <MenuBar brand="WORKOUT BUDDY" />
    <div class="container">
      <WorkoutLine />
    </div>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar.vue'
import WorkoutLine from './components/WorkoutLine'

export default {
  name: 'App',
  components: {
    MenuBar,
    WorkoutLine
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
