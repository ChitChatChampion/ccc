<template>
  <p class="text-light">
    <button @click="login">
      <b class="underline hover:text-cc-light">Login with Google</b>
    </button> to create game
  </p>
</template>

<script>
import { googleTokenLogin } from 'vue3-google-login';

export default {
  name: 'LoginComponent',
  props: {
    redirect: {
      type: String,
    }
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
            this.$router.push(this.redirect);
          });
      })
    }
  },
}
</script>