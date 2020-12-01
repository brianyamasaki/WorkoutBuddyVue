<template>
  <div>
    <ul>
      <WorkoutLine :titleLine="true" :workoutItem="allWorkoutItems[0]" />
      <WorkoutLine
        v-for="item in allWorkoutItems"
        :key="item.id"
        :workoutItem="item"
        :editable="editable"
        :titleLine="false"
      />
    </ul>
    <div>
      <button class="btn btn-lg" :class="btnClass" @click="addWorkoutItem">
        <b-icon icon="plus" scale="1.9"></b-icon>
      </button>
      <button class="btn btn-lg" :class="btnClass" @click="toggleEditable">
        <b-iconstack>
          <b-icon stacked icon="pencil-fill" />
          <b-icon
            v-if="editable"
            stacked
            scale="1.7"
            flip-h
            icon="slash-circle"
            style="color: red"
          />
        </b-iconstack>
      </button>
      <button class="btn btn-lg" :class="btnClass" @click="saveWorkoutList">
        Save
      </button>
    </div>
    <button
      v-if="canTransferWorkout"
      class="btn btn-lg btn-outline-primary transfer-btn"
      @click="onClickTransfer"
    >
      Transfer Workout to Account
    </button>
  </div>
</template>

<script>
import WorkoutLine from "./WorkoutLine.vue";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import router from "../routes";

export default {
  name: "WorkoutList",
  created: function () {
    this.loadWorkoutList();
  },
  computed: {
    ...mapGetters(["allWorkoutItems"]),
    btnClass() {
      return {
        "btn-secondary": !this.editable,
        "btn-primary": this.editable,
      };
    },
    canTransferWorkout() {
      return this.allWorkoutItems.length > 0 && this.isSignedIn;
    },
  },
  methods: {
    ...mapActions([
      "addWorkoutItem",
      "loadWorkoutList",
      "saveWorkoutList",
      "transferLegacyWorkout",
    ]),
    toggleEditable() {
      this.editable = !this.editable;
    },
    onClickTransfer() {
      this.transferLegacyWorkout();
      router.push("/workouts");
    },
  },
  data: function () {
    return {
      editable: false,
      isSignedIn: false,
    };
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isSignedIn = !!user;
    });
  },
  components: {
    WorkoutLine,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

button {
  margin: 0 0.5em;
}

.transfer-btn {
  margin: 1em 0 0 0;
}
</style>