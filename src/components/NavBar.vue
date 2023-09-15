<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button v-if='this.isAuthenticated' @click="logout">Logout from Google</button>
    <button v-else @click="login">Login with Google</button>
  </nav>
</template>

<script>
import { googleLogout, googleTokenLogin } from 'vue3-google-login';
import { getHeader } from '@/services';
import axios from 'axios';

export default {
  name: 'NavBar',
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    if (localStorage.getItem('expiry') > Date.now()) {
      this.isAuthenticated = true;
      return;
    }
    this.isAuthenticated = false;
    localStorage.setItem('token', null);
    localStorage.setItem('name', null);
    localStorage.setItem('expiry', null);
  },
  methods: {
    login() {
      googleTokenLogin().then(response => {
        localStorage.setItem('token', response.access_token);
        axios.post(process.env.API_ENDPOINT, {}, getHeader(response.access_token));
        this.isAuthenticated = true;
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
          .then(userResponse => userResponse.json())
          .then(data => {
            localStorage.setItem('name', data.name);
            localStorage.setItem('expiry', Date.now() + 3600000);
          });
      })
    },
    logout() {
      googleLogout();
      this.isAuthenticated = false;
      localStorage.setItem('token', null);
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