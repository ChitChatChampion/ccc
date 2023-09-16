<template>
  <nav>
    <router-link to="/">Home</router-link>
    <button v-if='this.isAuthenticated' @click="logout">Logout from Google</button>
    <button v-else @click="login">Login with Google</button>
  </nav>
</template>

<script>
import axios from 'axios';
import { googleLogout, googleTokenLogin } from 'vue3-google-login';
import { getHeader, getUrl } from '@/services';

export default {
  name: 'NavBar',
  data() {
    return {
      isAuthenticated: false,
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
      googleTokenLogin().then(tokenResponse => {
        localStorage.setItem('token', tokenResponse.access_token);

        // get user data from Google
        fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
          .then(userDataResponse => userDataResponse.json())
          .then(data => {
            localStorage.setItem('name', data.name);
            localStorage.setItem('expiry', Date.now() + 3600000);
          });

        // try to log in the user
        const url = getUrl('');
        axios.post(url, {}, getHeader())
          .then(backendResponse => {
            switch (backendResponse.status) {
              case 200:
                this.$swal.fire({ icon: 'success', title: `Welcome back!` });
                this.isAuthenticated = true; // authenticate when login is successful.
                break;
              case 201:
                this.$swal.fire({ icon: 'success', title: `Welcome to ChitChatChampion!` });
                this.isAuthenticated = true; // authenticate when user registration is successful.
                break;
              default:
                this.isAuthenticated = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.isAuthenticated = false;
          })
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