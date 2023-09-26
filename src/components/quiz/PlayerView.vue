<template>
  <div class="player-container">
    <div class="status-bar">
      <p class="player-info" id="pin">PIN: {{ selectedPin }}</p>
    </div>
    <div v-if="!gameStarted && !questionOver">
      <p>
        You're in!<br />Do you see your nickname on the screen?
      </p>
      <div class="answer-container">
        <div class="q-blank q"></div>
        <div class="q-blank q"></div>
        <div class="q-blank q"></div>
        <div class="q-blank q"></div>
      </div>
    </div>
    <div v-else-if="gameStarted && !questionOver && !answerSubmitted">
      <PlayerQuestions @submitAnswer="submitAnswer" />
    </div>
    <div v-else-if="gameStarted && !questionOver && answerSubmitted">
      <div class="waiting-for-results">
        <p class="answer-indicator" id="too-fast">Did You answer too fast????</p>
        <img src="@/assets/load-circle-outline.svg" alt="" class="load-circle" />
      </div>
    </div>
    <PlayerQuestionOver v-else :answeredCorrect="answeredCorrect" />
    <div class="status-bar">
      <p class="player-info">{{ nickname }}</p>
      <div class="status-bar-score" v-if="gameStarted && !questionOver && answerSubmitted">{{ score }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PlayerQuestions from "./PlayerQuestions.vue";
import PlayerQuestionOver from "./PlayerQuestionOver.vue";

export default {
  name: "PlayerView",
  components: {
    PlayerQuestions,
    PlayerQuestionOver,
  },
  data() {
    return {
      pinCorrect: false,
      gameStarted: false,
      questionOver: false,
      answerSubmitted: false,
      answeredCorrect: false,
      score: 0,
    };
  },
  computed: {
    ...mapState(["selectedPin", "nickname"]),
  },
  methods: {
    submitAnswer(num) {
      this.$socket.emit("question-answered", {
        name: this.nickname,
        answer: num,
        pin: this.selectedPin,
      });
      this.answerSubmitted = true;
    },
  },
  mounted() {
    this.socket = this.$socket;
    this.socket.emit("player-joined", this.selectedPin);
    this.socket.emit("player-add", this.$store.state);
    this.socket.on("room-joined", (data) => {
      console.log("Quiz data: " + data);
    });
    this.socket.on("question-over", () => {
      this.questionOver = true;
    });
    this.socket.on("next-question", () => {
      console.log("hit");
      this.gameStarted = true;
      this.questionOver = false;
      this.answerSubmitted = false;
      this.answeredCorrect = false;
    });
    this.socket.on("sent-info", (data) => {
      this.answeredCorrect = data.answeredCorrect;
      this.score += data.score;
    });
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
