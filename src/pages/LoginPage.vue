<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-sm-12">
      <h1>Please Log In</h1>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group label="Email address:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          />
        </b-form-group>
        <b-form-group label="Choose your password:" label-for="password">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          />
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary">Log In</b-button>
        </div>
        <b-alert :show="showError" variant="danger">
          {{ errorMessage }}
        </b-alert>
      </b-form>
      <hr />
      <p>
        New to Workout Buddy?
        <router-link to="/createAccount" class="btn btn-primary btnSupport"
          >Create an account</router-link
        >
      </p>
      <p>
        Forgot your password?
        <router-link to="/resetPassword" class="btn btn-primary btnSupport"
          >Reset your password</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    showError() {
      return this.getUserErrorMessage() ? true : false;
    },
    errorMessage() {
      const msg = this.getUserErrorMessage();
      return msg;
    },
  },
  methods: {
    ...mapGetters(["getUserErrorMessage"]),
    ...mapActions(["signIn", "setUserInfo", "resetAuthError"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.signIn(this.form);
    },
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUserInfo(user);
    });
    this.resetAuthError();
  },
};
</script>

<style scoped>
.btnSupport {
  margin-left: 0.5em;
}
</style>