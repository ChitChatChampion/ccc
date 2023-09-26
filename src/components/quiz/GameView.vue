<template>
  <div class="component-container">
    <div class="pin">
      <p id="player-pin">Kwizz Pin</p>
      <h1>{{ pin }}</h1>
    </div>
    <div v-if="!isLive && !questionOver && !gameOver" class="btn-players">
      <button @click="startGame" class="btn-play">Play</button>
      <p class="player-name" id="player-join">Players joined!</p>
      <p class="player-name" v-for="player in players" :key="player.id">{{ player.name }}</p>
    </div>
    <div v-else-if="isLive && !questionOver && !gameOver">
      <GameQuestions
        :question="questions[currentQuestion].question"
        :answer1="questions[currentQuestion].answer1"
        :answer2="questions[currentQuestion].answer2"
        :answer3="questions[currentQuestion].answer3"
        :answer4="questions[currentQuestion].answer4"
        @questionOver="questionOver"
      />
    </div>
    <div v-else>
      <GameQuestionOver
        :nextQuestion="nextQuestion"
        :leaderboard="leaderBoard"
        :lastQuestion="questions.length === currentQuestion"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import { mapState } from "vuex";
import GameQuestions from "./GameQuestions.vue";
import GameQuestionOver from "./GameQuestionOver.vue";

export default {
  data() {
    return {
      pin: 0,
      timer: 20,
      isLive: false,
      questionOver: false,
      gameOver: false,
      currentQuestion: 0,
      questions: [],
      players: [],
      playerCounter: 0,
      leaderBoard: [],
    };
  },
  methods: {
    questionOver() {
      // Implementation for the questionOver method.
      // ...
    },
    nextQuestion() {
      // Implementation for the nextQuestion method.
      // ...
    },
    startGame() {
      // Implementation for the startGame method.
      // ...
    },
    generatePin() {
      // Implementation for the generatePin method.
      // ...
    },
    addPlayer(name, id) {
      // Implementation for the addPlayer method.
      // ...
    },
    submitAnswer(name, answer) {
      // Implementation for the submitAnswer method.
      // ...
    },
    getLeaderBoard() {
      // Implementation for the getLeaderBoard method.
      // ...
    },
  },
  computed: {
    ...mapState(["quiz"]),
  },
  created() {
    // Implementation for the created lifecycle hook.
    // ...
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
