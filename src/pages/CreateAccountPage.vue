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
          >
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Password" />
        </b-form-group>
        <div class="text-center">
        <b-button type="submit" variant="primary">Create Account</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form.email, this.form.password)
    }
  }
}
</script>