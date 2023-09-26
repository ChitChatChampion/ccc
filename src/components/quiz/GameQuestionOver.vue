<template>
  <div>
    <div v-if="!lastQuestion" class="question-over-wrapper">
      <div class="center">
        <h1 class="player-name">Question Over</h1>
      </div>
      <div class="center">
        <button class="btn-new" @click="nextQuestion">Next Question</button>
      </div>
    </div>
    <div v-else>
      <GameOver :leaderboard="leaderboard" />
    </div>
  </div>
</template>

<script>
import GameOver from "./GameOver.vue"; // Make sure to replace with the correct path

export default {
  props: {
    leaderboard: Array,
    lastQuestion: Boolean,
  },
  methods: {
    nextQuestion() {
      this.$emit("nextQuestion"); // Emit a custom event to trigger the next question
    },
  },
  components: {
    GameOver,
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
