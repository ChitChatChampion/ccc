<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button v-if='this.isAuthenticated' @click="logout">Logout from Google</button>
    <button v-else @click="login">Login with Google</button>
  </nav>
</template>

<script>
import { googleLogout, googleTokenLogin } from 'vue3-google-login';

export default {
  name: 'NavBar',
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    if (localStorage.getItem('expiry') > Date.now()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
      localStorage.setItem('email', null);
      localStorage.setItem('name', null);
      localStorage.setItem('expiry', null);
    }
  },
  methods: {
    login() {
      googleTokenLogin().then(response => {
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
          .then(userResponse => userResponse.json())
          .then(data => {
            localStorage.setItem('email', data.email);
            this.isAuthenticated = true;
            localStorage.setItem('name', data.name);
            localStorage.setItem('expiry', Date.now() + 3600000);
          });
      })
    },
    logout() {
      googleLogout();
      this.isAuthenticated = false;
      localStorage.setItem('email', null);
      localStorage.setItem('name', null);
      localStorage.setItem('expiry', null);
    }
  },
}
</script>

<style scoped>
nav {
  position: absolute
}
</style>