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
        <b-alert :show="showError" :[disabled]="disabled" variant="danger">
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

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    showError() {
      return this.getAuthErrorMessage() ? true : false;
    },
    errorMessage() {
      const msg = this.getAuthErrorMessage();
      return msg;
    },
    disabled() {
      return this.loading ? "disabled" : "fakedisabled";
    },
  },
  methods: {
    ...mapGetters(["getAuthErrorMessage"]),
    ...mapActions(["signIn", "setUserInfo", "resetAuthError"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      this.signIn(this.form);
    },
  },
  mounted: function () {
    this.resetAuthError();
    this.loading = false;
  },
};
</script>

<style scoped>
.btnSupport {
  margin-left: 0.5em;
}
</style>