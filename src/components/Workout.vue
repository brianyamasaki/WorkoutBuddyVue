<template>
  <div>
    <strong>{{workout.description}}</strong>
  </div>
</template>

<script>
export default {
  name: 'Workout',
  props: {
    workout: Object
  }
  
}
</script>

