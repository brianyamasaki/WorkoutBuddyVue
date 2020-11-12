<template>
  <nav class="navbar navbar-expand-md fixed-top">
    <router-link class="navbar-brand" to="/">
    {{ brand }}
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/ideas">Ideas</router-link>
        </li>
      </ul>
      <b-button v-if="isSignedIn" @click="signOut" class="pull-right">Sign Out</b-button>
      <router-link v-else class="nav-link pull-right" to="/login">Sign in</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    brand: String
  },
  methods: {
    ...mapActions(['signOut']),
    ...mapGetters(['getUserInfo'])
    },
  computed: {
    isSignedIn() {
      return !!this.getUserInfo();
    }
  },
  name: 'MenuBar'
}
</script>

<style scoped>
.nav-link {
  color: black;
}
</style>