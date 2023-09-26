<template>
  <div class="mapped-container">
    <div v-if="!toggle" class="toggle-container">
      <div class="btn-done-div">
        <router-link to="/host">
          <button class="btn-play btn-done">Done</button>
        </router-link>
      </div>
      <div class="kwizz-container-edit">
        <h1 class="kwizz-title">{{ quiz.quiz_name }}</h1>
        <br />
        <p class="kwizz-info kwizz-desc">{{ quiz.info }}</p>
        <div class="btn-update">
          <button @click="displayEdit" class="btn-play">Update</button>
        </div>
      </div>
    </div>
    <div v-else class="toggle-container">
      <div class="btn-done-div">
        <router-link to="/host">
          <button class="btn-play btn-done">Done</button>
        </router-link>
      </div>
      <div class="kwizz-container-edit">
        <input
          :placeholder="quiz.quiz_name"
          @input="newName = $event.target.value"
          class="title-input input-edit"
        />
        <br />
        <textarea
          :placeholder="quiz.info"
          @input="newInfo = $event.target.value"
          class="desc-input input-edit"
        ></textarea>
        <div class="btn-container-edit">
          <button @click="updateQuiz" class="btn-play">Save</button>
          <button @click="displayEdit" class="btn-play">Cancel</button>
        </div>
      </div>
    </div>
    <div class="question-edit-wrapper">
      <div class="add-quesiton-div">
        <router-link :to="`/host/newquestion/${quizToEdit.id}`" class="btn-link">
          <button class="btn-new" id="add-question-btn">Add Question</button>
        </router-link>
      </div>
      <br /><br />
      <div class="mapped-questions">
        <div
          v-for="question in questions"
          :key="question.id"
          class="question-container"
        >
          <h1>{{ question.question }}</h1>
          <ul>
            <li>1: {{ question.answer1 }}</li>
            <li>2: {{ question.answer2 }}</li>
            <li>3: {{ question.answer3 }}</li>
            <li>4: {{ question.answer4 }}</li>
            <li>Correct: {{ question.correctanswer }}</li>
          </ul>
          <div class="btn-container-edit">
            <router-link :to="`/host/editquestion/${question.id}`">
              <button class="btn-play">Edit</button>
            </router-link>
            <button @click="deleteQuestion(question.id)" class="btn-play">
              Delete
            </button>
          </div>
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
      questions: [],
      quiz: {},
      newName: '',
      newInfo: '',
      toggle: false,
    };
  },
  computed: {
    quizToEdit() {
      return this.$store.state.quizToEdit;
    },
  },
  methods: {
    ...mapActions(['editingQuiz']),
    getQuestions() {
      axios.get(`/api/getquestions/${this.quizToEdit.id}`).then((res) => {
        this.questions = res.data;
      });
    },
    deleteQuestion(id) {
      axios.delete(`/api/deletequestion/${id}`).then(() => {
        this.getQuestions();
      });
    },
    displayEdit() {
      this.toggle = !this.toggle;
    },
    updateQuiz() {
      if (this.newName && this.newInfo) {
        axios
          .put('/api/updatequiz', {
            newName: this.newName,
            newInfo: this.newInfo,
            id: this.quiz.id,
          })
          .then((res) => {
            this.handleUpdatedQuiz(this.quiz.id);
          });
      } else {
        alert('All fields must be completed');
      }
    },
    handleUpdatedQuiz(id) {
      axios.get(`/api/getquiz/${id}`).then((res) => {
        this.editingQuiz(res.data[0]);
        this.quiz = this.quizToEdit;
      });
    },
  },
  created() {
    this.quiz = this.quizToEdit;
    this.getQuestions();
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
