<template>
  <b-icon icon="arrow-clockwise" animation="spin" font-scale="8" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GoogleLogin',
  mounted: function() {
    this.signinGoogle();
    this.getErrorMessage();
  },
  methods: mapActions(['getErrorMessage', 'signinGoogle'])
}
</script>

<style scoped>
b-icon {
  padding: 2em 0;
}
</style>