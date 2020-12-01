<template>
  <b-navbar toggleable="md">
    <router-link class="navbar-brand" to="/" exact>
      {{ brand }}
    </router-link>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" exact>Home</b-nav-item>
        <b-nav-item to="/ideas" exact>Ideas</b-nav-item>
        <b-nav-item v-if="isSignedIn" to="/workouts" exact>Workouts</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button v-if="isSignedIn" @click="signOut">Sign Out</b-button>
        <b-nav-item v-else to="/login" exact> Sign in</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";

export default {
  props: {
    brand: String,
  },
  data: function () {
    return {
      isSignedIn: false,
    };
  },
  methods: {
    ...mapActions(["signOut"]),
    ...mapGetters(["getAuthInfo"]),
  },
  name: "MenuBar",
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isSignedIn = !!user;
    });
  },
};
</script>

<style scoped>
.nav-link {
  color: black;
}
.router-link-active {
  font-weight: 700;
}
</style>