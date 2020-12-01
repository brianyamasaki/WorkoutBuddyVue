<template>
  <div>
    <h1>My Workouts</h1>
    <button
      v-if="editable"
      class="btn btn-secondary btn-med"
      @click="toggleShowForm"
    >
      New Workout
    </button>
    <NewWorkoutForm v-if="showForm" :fnDone="toggleShowForm" />
    <h3 v-if="loading">Loading...</h3>
    <ul v-else class="text-left">
      <li v-for="workout in workouts" :key="workout.id" :workout="workout">
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
    <button
      v-if="!showForm"
      class="btn btn-secondary btn-med"
      @click="toggleEditable"
    >
      {{ editBtnText }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import NewWorkoutForm from "../components/NewWorkout.vue";

export default {
  name: "WorkoutsPage",
  data: function () {
    return {
      loading: true,
      editable: false,
      showForm: false,
    };
  },
  computed: {
    workouts() {
      return this.getWorkouts();
    },
    editBtnText() {
      return this.editable ? "View" : "Edit";
    },
  },
  methods: {
    ...mapGetters(["getAuthInfo", "getWorkouts"]),
    ...mapActions(["bindWorkouts", "addNewWorkout"]),
    ...mapMutations(["removeWorkout"]),
    routeString(workout) {
      return `/workouts/${workout.id}`;
    },
    toggleEditable() {
      this.editable = !this.editable;
    },
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
  },
  filters: {
    truncText(text, len) {
      if (!text) return "";
      if (text.length > len) {
        return text.slice(0, len - 2) + "..";
      }
    },
  },
  mounted: function () {
    const auth = this.getAuthInfo();
    if (auth && auth.uid) {
      this.bindWorkouts(auth.uid).then(() => {
        this.loading = false;
        if (this.getWorkouts().length === 0) {
          this.editable = true;
        }
      });
    }
  },
  components: {
    NewWorkoutForm,
  },
};
</script>

<style scoped>
button {
  margin: 0 0.5em;
}
ul {
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
}
.workout-title {
  font-size: 1.3rem;
}
</style>