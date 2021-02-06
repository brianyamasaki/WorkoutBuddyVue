<template>
  <b-row>
    <b-col sm="12">
      <h1>Workouts</h1>
    </b-col>
    <b-col sm="12" md="6" class="text-left">
      <strong>Master workouts</strong> are suggested workouts for daily training
      sessions. An example would be a Leg workout or an Upper Body workout that
      you might choose to do on Mondays or Thursdays.
    </b-col>

    <b-col sm="12" md="6" class="text-left">
      <strong>Daily workouts</strong> start by choosing a master workout to do
      for today, then doing and recording that workout. Your daily workouts will
      be stored to be reviewed later.
    </b-col>
    <!-- <b-col sm="12">
      <MasterWorkouts />
    </b-col> -->

    <b-col sm="12">
      <h2>Daily Workouts</h2>
      <Loading v-if="loading" />
      <!-- we create an unordered list of workouts 
      where we click on a link to a new route that includes the unique workout ID in the path-->
      <ul v-else class="text-left">
        <li v-for="workout in workouts" :key="workout.id" :workout="workout">
          <router-link :to="routeString(workout)">
            <span class="workout-title">{{ workout.title }}</span>
          </router-link>
          <div>
            <!-- <button
              class="btn btn-outline-primary btn-sm"
              @click="copyToMasterWorkout(workout.id)"
              v-b-tooltip.hover
              title="Move Workout to Master Workouts"
            >
              <b-icon scale="1.1" icon="truck" />
            </button> -->
            <button
              class="btn btn-sm btn-outline-danger"
              @click="removeWorkout(workout.id)"
              v-b-tooltip.hover
              title="Delete Workout"
            >
              <b-icon icon="slash-circle"></b-icon>
            </button>
          </div>
        </li>
      </ul>
      <button
        v-if="editable"
        class="btn btn-primary btn-med"
        @click="toggleShowForm"
        v-b-tooltip.hover
        title="Add New Workout"
      >
        <b-icon icon="plus" scale="1.9"></b-icon>
      </button>
      <button
        class="btn btn-primary btn-med"
        @click="toggleEditable"
        v-b-tooltip.hover
        :title="editTooltip"
      >
        <b-icon icon="pencil-fill" :class="{ 'editable-color': editable }" />
      </button>
      <NewWorkoutForm v-if="showForm && editable" :fnDone="toggleShowForm" />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewWorkoutForm from "../components/NewWorkout.vue";
import Loading from "../components/Loading";
// import MasterWorkouts from "../components/MasterWorkouts";

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
    masterWorkouts() {
      return this.getMasterWorkouts();
    },
    editTooltip() {
      return this.editable ? "View Workouts" : "Edit Workouts";
    },
  },
  methods: {
    ...mapGetters(["getAuthInfo", "getWorkouts", "getMasterWorkouts"]),
    ...mapActions([
      "bindWorkouts",
      "addNewWorkout",
      "copyWorkoutToMasterWorkouts",
      "removeWorkout",
    ]),
    routeString(workout) {
      return `/workouts/${workout.id}`;
    },
    toggleEditable() {
      this.editable = !this.editable;
    },
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    copyToMasterWorkout(workoutID) {
      this.copyWorkoutToMasterWorkouts(workoutID);
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
    Loading,
    // MasterWorkouts,
  },
};
</script>

<style>
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
.editable-color {
  color: red;
}
</style>