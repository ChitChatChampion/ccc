<template>
  <router-view/>
  <div v-if='this.token'>
    <p>Google OAuth Token: {{ this.token }}</p>
  </div>
  <div>
    <button @click="login">Login Using Google</button>
  </div>
</template>

<script>
import { googleTokenLogin } from 'vue3-google-login';
export default {
  name: 'App',
  data() {
    return {
      token: null
    }
  },
  created() {
    if (localStorage.getItem('tokenExpiry') > Date.now()) {
      this.token = localStorage.getItem('googleAccessToken');
    }
  },
  methods: {
    login() {
      googleTokenLogin().then(response => {
        console.log("Handle response", response);
        const accessToken = response.access_token;
        localStorage.setItem('googleAccessToken', accessToken);
        const expiry = Date.now() + 3600000
        localStorage.setItem('tokenExpiry', expiry);
      });
    },
  },
}
</script>
