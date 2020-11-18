<template>
  <div>
    <h1>Users List</h1>
    <ul>
      <li v-for="user in Users" :key="user.uid">{{`${user.firstName} ${user.lastName}`}}</li>
    </ul>
    <p>{{currentUser}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users' ,
  methods: {
    ...mapGetters(['getUsers', 'getAuthInfo']),
    ...mapActions(['bindUsers']),
  },
  computed: {
    Users() {
      return this.getUsers();
    },
    currentUser() {
      return this.getAuthInfo();
    }
  },
  created() {
    this.bindUsers();
  }
}
</script>