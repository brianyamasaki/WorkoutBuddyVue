<template>
  <div>
    <h2>Master Workouts</h2>
    <Loading v-if="loadingMasterWorkouts" />
    <!-- we create an unordered list of master workouts 
      where we click on a link to a new route that includes the unique workout ID in the path-->
    <ul v-else class="text-left">
      <li
        v-for="workout in masterWorkouts"
        :key="workout.id"
        :workout="workout"
      >
        <router-link :to="routeString(workout)">
          <span class="workout-title">{{ workout.title }}</span>
        </router-link>
        <button
          class="btn btn-sm btn-outline-danger"
          @click="removeWorkout(workout.id)"
        >
          <b-icon icon="slash-circle"></b-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "../components/Loading";

export default {
  name: "MasterWorkouts",
  data: function () {
    return {
      loadingMasterWorkouts: true,
    };
  },
  computed: {
    masterWorkouts() {
      return this.getMasterWorkouts();
    },
  },
  methods: {
    ...mapGetters(["getAuthInfo", "getMasterWorkouts"]),
    ...mapActions(["bindMasterWorkouts", "removeWorkout"]),
    routeString(workout) {
      return `/workouts/${workout.id}`;
    },
  },
  mounted: function () {
    const auth = this.getAuthInfo();
    if (auth && auth.uid) {
      this.bindMasterWorkouts(auth.uid).then(() => {
        this.loadingMasterWorkouts = false;
      });
    }
  },

  components: {
    Loading,
  },
};
</script>