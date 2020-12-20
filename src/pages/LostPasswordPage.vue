<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-sm-12">
      <h1>Need to Reset Your Password?</h1>
      <b-form @submit="onSubmit" class="text-left">
        <b-form-group
          label="Email address:"
          label-for="email"
          description="Enter the email that you used to create your account and we'll send you a password reset email"
        >
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Email"
          />
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary">Reset my password</b-button>
        </div>
        <b-alert id="errorAlert" :show="showError" variant="danger">
          {{ errorMessage }}
        </b-alert>
      </b-form>
      <p v-if="emailSent" id="success">
        A reset message has been sent to your email account. Please give it a
        few minutes to arrive. Also check your Spam folder to see if it ended up
        in there.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LostPasswordPage",
  data: function () {
    return {
      email: "",
      errorMessage: "",
      emailSent: false,
    };
  },
  computed: {
    showError() {
      return this.errorMessage ? true : false;
    },
  },
  methods: {
    ...mapActions(["sendPasswordReset"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.errorMessage = "";
      this.sendPasswordReset(this.email)
        .then(() => {
          this.emailSent = true;
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
#success {
  margin-top: 1em;
}
#errorAlert {
  margin-top: 1em;
}
</style>