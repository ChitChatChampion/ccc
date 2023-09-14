<template>
  <router-view/>
  <button @click="login">Login Using Google</button>
  <div v-if='googleAccessToken'>
    <p>Google OAuth Token: {{ googleAccessToken }}</p>
  </div>
</template>

<script>
import { googleTokenLogin } from 'vue3-google-login';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapGetters(['googleAccessToken'])
  },
  methods: {
    login() {
      googleTokenLogin().then(response => {
        const googleAccessToken = response.access_token;

        // Dispatch the action to store the Google OAuth token in Vuex
        this.$store.dispatch('setGoogleToken', googleAccessToken);

        console.log("Handle response", response);
      });
    },
  },
}
</script>
