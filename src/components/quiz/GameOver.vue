<template>
  <div class="game-over">
    <!-- <Zoom /> -->
    <h1 class="leaderBoard-title">Game Over</h1>
    <br />
    <h2 class="leaderBoard">1st Place: {{ leaderboard[0].name }}</h2>
    <h2 class="leaderBoard">2nd Place: {{ leaderboard[1].name }}</h2>
    <h2 class="leaderBoard">Last Place: {{ leaderboard.slice(-1)[0].name }}</h2>
    <br />
    <router-link to="/host">
      <button class="btn-newGame">Start a new Game?</button>
    </router-link>
  </div>
</template>

<script>
// import Zoom from "@/components/animations/ZoomIn.vue"; // Make sure to replace with the correct path

export default {
  props: {
    leaderboard: Array,
  },
  // components: {
  //   Zoom,
  // },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
