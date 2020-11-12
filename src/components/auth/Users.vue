<template>
  <div>
    <h1>Users List</h1>
    <ul>
      <li v-for="user in Users" :key="user.id">{{`${user.firstName} ${user.lastName}`}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users' ,
  methods: {
    ...mapGetters(['getUsers']),
    ...mapActions(['bindUsers']),
  },
  computed: {
    Users() {
      return this.getUsers();
    }
  },
  created() {
    this.bindUsers();
  }
}
</script>