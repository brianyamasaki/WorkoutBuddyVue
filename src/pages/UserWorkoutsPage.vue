<template>
  <div>
    <h1>My Workouts</h1>
    <ul class="text-left">
      <li v-for="workout in workouts" :key="workout.date" :workout="workout">
        <router-link :to="routeString(workout)">{{workout.description}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WorkoutsPage',
  data: function() {
    return {
      workouts: []
    }
  },
  methods: {
    ...mapGetters(['getWorkouts']),
    routeString(workout) {
      return `/workouts/${workout.id}`;
    }
  },
  mounted: function() {
    this.workouts = this.getWorkouts();
  }
}
</script>