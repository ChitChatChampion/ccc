<template>
  <p class="text-light">
    <button @click="login">
      <b class="underline hover:text-cc-light">Login with Google</b>
    </button> to create game
  </p>
</template>

<script>
import loginToGoogle from './loginToGoogle';

export default {
  name: 'LoginComponent',
  props: {
    redirect: {
      type: String,
    }
  },
  methods: {
    login() {
      loginToGoogle({ redirect: this.redirect, router: this.$router });
    }
  },
}
</script>