<template>
  <div class="questions-container">
    <Timer />
    <h1 class="player-name">{{ question }}</h1>
    <div class="questions-grid">
      <div class="question q1">
        <div class="shape-container">
          <img src="@/assets/triangle.svg" alt="" class="shape-question" />
        </div>
        <p id="player-join">{{ answer1 }}</p>
      </div>
      <div class="question q2">
        <div class="shape-container">
          <img src="@/assets/diamond.svg" alt="" class="shape-question" />
        </div>
        <p id="player-join">{{ answer2 }}</p>
      </div>
      <div class="question q3">
        <div class="shape-container">
          <img src="@/assets/square.svg" alt="" class="shape-question" />
        </div>
        <p id="player-join">{{ answer3 }}</p>
      </div>
      <div class="question q4">
        <div class="shape-container">
          <img src="@/assets/circle.svg" alt="" class="shape-question" />
        </div>
        <p id="player-join">{{ answer4 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "./TimerComponent.vue"; // Make sure to replace with the correct path

export default {
  props: {
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
  },
  components: {
    Timer,
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
