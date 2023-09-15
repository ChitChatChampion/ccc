<template>
  <NavBar/>
  <br/>
  <br/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>