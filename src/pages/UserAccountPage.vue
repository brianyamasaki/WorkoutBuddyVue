<template>
  <div class="row">
    <h1 class="text-center col-sm-12">Your Account</h1>
    
    <ul>
      <li>
        <strong>Display Name:</strong>&nbsp;{{auth.displayName || ''}}
      </li>
      <li>
          <strong>Email:</strong>&nbsp;
          {{auth.email || ''}}
      </li>
      <li>
          <strong>First Name:</strong>&nbsp;
          {{getUserName()}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Account',
  data: function() {
    return {
      auth: {},
      user: null
    }
  },
  mounted: function() {
    this.auth = this.getAuthInfo();
    this.user = this.getUserInfo();
  },
  methods: {
    ...mapGetters(['getUserInfo', 'getAuthInfo']),
    getUserName() {
      return this.user && this.user.firstName || '';
    }
  }
}
</script>