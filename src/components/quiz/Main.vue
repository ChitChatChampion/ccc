<template>
  <div class="mapped-container">
    <div class="host-logo-container">
      <img src="@/assets/Kwizz.svg" alt="kwizz logo" class="logo" />
    </div>
    <div class="newKwizz">
      <router-link to="/host/newquiz" class="btn-link">
        <button class="btn-new">New Kwizz!</button>
      </router-link>
    </div>
    <div class="mapped-Kwizzes-container">
      <div v-for="quiz in quizzes" :key="quiz.id" class="kwizz-container">
        <h1 class="kwizz-info kwizz-title">{{ quiz.quiz_name }}</h1>
        <p class="kwizz-info kwizz-desc">{{ quiz.info }}</p>
        <div class="btn-container">
          <button @click="setRedirect(quiz)" class="btn-play">Play</button>
          <button @click="deleteQuiz(quiz.id)" class="btn-play">Delete</button>
          <router-link :to="'/host/questions'" @click="editingQuiz(quiz)">
            <button class="btn-play">Edit</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      quizzes: [],
      redirect: false,
    };
  },
  methods: {
    ...mapActions(['selectedQuiz', 'editingQuiz']),
    getQuizzes() {
      axios.get(`/api/getQuizzes`).then((res) => {
        this.quizzes = res.data;
      });
    },
    setRedirect(quiz) {
      this.selectedQuiz(quiz);
      this.redirect = true;
    },
    deleteQuiz(id) {
      axios.delete(`/api/deletequiz/${id}`).then((res) => {
        if (res.status === 200) {
          this.getQuizzes();
        } else {
          alert('Something went wrong :(');
        }
      });
    },
  },
  created() {
    this.getQuizzes();
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
