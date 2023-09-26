<template>
  <div>
    <div v-if="answeredCorrect" class="answer correct">
      <h1 class="answer-indicator">Correct</h1>
      <Check />
    </div>
    <div v-else class="answer incorrect">
      <h1 class="answer-indicator">Incorrect</h1>
      <Incorrect />
    </div>
  </div>
</template>

<script>
import Check from "@/components/animations/Check.vue";
import Incorrect from "@/components/animations/Incorrect.vue";

export default {
  props: {
    answeredCorrect: Boolean,
  },
  components: {
    Check,
    Incorrect,
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
