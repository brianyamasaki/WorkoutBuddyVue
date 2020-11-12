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
            placeholder="Email" />
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
        <div class="text-center">
        <b-button type="submit" variant="primary">Create Account</b-button>
        </div>
      </b-form>
      <b-alert v-if="getUserErrorMessage" variant="warning">
        {{getUserErrorMessage}}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreateAccountPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    passwordState() {
      return this.form.password.length > 6 ? true : false;
    }
  },
  methods: {
    ...mapGetters(['getUserInfo', 'getUserErrorMessage']),
    ...mapActions(['createAccount']),
    onSubmit(evt) {
      evt.preventDefault();
      if (this.passwordState) {
        this.createAccount(this.form);
      }
    }
  }
}
</script>