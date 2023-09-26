<template>
  <div class="mapped-container">
    <div class="new-kwizz-form">
      <label class="kwizz-desc kwizz-info">New Kwizz Title</label>
      <input class="title-input" v-model="quiz_name" type="text" />
      <label class="kwizz-desc kwizz-info">Description</label>
      <textarea class="desc-input" v-model="info"></textarea>
      <div class="kwizz-info ok-go-div">
        <button @click="createQuiz" class="btn-play ok-go">Ok, Go</button>
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
      quiz_name: '',
      info: '',
      redirect: false,
    };
  },
  methods: {
    ...mapActions(['editingQuiz']),
    handleInput(e) {
      this.quiz_name = e.target.value;
    },
    handleTextarea(e) {
      this.info = e.target.value;
    },
    createQuiz() {
      axios.post('/api/newquiz', { name: this.quiz_name, info: this.info }).then((res) => {
        this.editingQuiz(res.data[0]);
        this.redirect = true;
      });
    },
  },
  computed: {
    shouldRedirect() {
      return this.redirect;
    },
  },
  watch: {
    shouldRedirect(newVal) {
      if (newVal) {
        this.$router.push('/host/questions');
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
