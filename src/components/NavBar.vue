<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button v-if='this.token' @click="logout">Logout from Google</button>
    <button v-else @click="login">Login with Google</button>
  </nav>
</template>

<script>
import { googleLogout, googleTokenLogin } from 'vue3-google-login';
export default {
  name: 'NavBar',
  data() {
    return {
      token: null
    }
  },
  created() {
    if (localStorage.getItem('tokenExpiry') > Date.now()) {
      this.token = localStorage.getItem('googleAccessToken');
    } else {
      localStorage.setItem('googleAccessToken', null);
      localStorage.setItem('tokenExpiry', null);
    }
  },
  methods: {
    login() {
      googleTokenLogin().then(response => {
        this.token = response.access_token;
        localStorage.setItem('googleAccessToken', this.token);
        const expiry = Date.now() + 3600000
        localStorage.setItem('tokenExpiry', expiry);
      });
    },
    logout() {
      googleLogout();
      this.token = null;
      localStorage.setItem('googleAccessToken', null);
      localStorage.setItem('tokenExpiry', null);
    }
  },
}
</script>

<style scoped>
nav {
  position: absolute
}
</style>