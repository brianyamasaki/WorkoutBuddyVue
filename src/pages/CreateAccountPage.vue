<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-sm-12">
      <h1>Create an Account</h1>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group
          label="Email address:"
          label-for="email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          />
        </b-form-group>
        <b-form-group
          label="Choose your password:"
          label-for="password"
          description="Minimum of 6 characters in length"
        >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
            :state="passwordState"
          />
        </b-form-group>
        <b-form-group label="First Name" label-for="fname">
          <b-form-input
            id="fname"
            v-model="form.firstName"
            type="text"
            placeholder="First Name"
          />
        </b-form-group>
        <b-form-group label="Last Name" label-for="lname">
          <b-form-input
            id="lname"
            v-model="form.lastName"
            type="text"
            placeholder="Last Name"
          />
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary">Create Account</b-button>
        </div>
      </b-form>
      <b-alert :show="showError" variant="danger">
        {{ errorMessage }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateAccountPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      submitted: false,
    };
  },
  computed: {
    passwordState() {
      return this.form.password.length > 6 ? true : false;
    },
    showError() {
      return this.getAuthErrorMessage() ? true : false;
    },
    errorMessage() {
      return this.getAuthErrorMessage();
    },
  },
  methods: {
    ...mapGetters(["getAuthInfo", "getAuthErrorMessage"]),
    ...mapActions(["createAccount", "addToUserTable", "resetAuthError"]),
    onSubmit(evt) {
      evt.preventDefault();
      if (this.passwordState) {
        this.createAccount(this.form);
        this.submitted = true;
      }
    },
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && this.submitted && !this.getAuthErrorMessage()) {
        user.updateProfile({
          displayName: `${this.form.firstName} ${this.form.lastName}`,
        });
        this.addToUserTable({
          uid: user.uid,
          email: user.email,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
        });
      }
    });
    this.resetAuthError();
  },
};
</script>