<template>
  <div class="answer-container">
    <div class="q1" @click="submitAnswer(1)">
      <img src="@/assets/triangle.svg" alt="" class="shape" />
    </div>
    <div class="q2" @click="submitAnswer(2)">
      <img src="@/assets/diamond.svg" alt="" class="shape" />
    </div>
    <div class="q3" @click="submitAnswer(3)">
      <img src="@/assets/square.svg" alt="" class="shape" />
    </div>
    <div class="q4" @click="submitAnswer(4)">
      <img src="@/assets/circle.svg" alt="" class="shape" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerQuestions",
  props: {
    submitAnswer: Function,
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
