<template>
  <h1 v-if="questions.length" class="font-bold text-3xl text-ns">Questions</h1>
  <p v-if="questions.length" class="mt-5">See any prompts that you don't like? Feel free to edit them or add your own. Make the best ice-breaker!</p>
  <ul v-if="questions.length" class="bg-light shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 grid gap-5 mt-5">
    <QuestionPreview
      v-for="(question, index) in questions"
      :key="question.id"
      :index="index"
      :id="question.id"
      :content="question.content"/>
    <OrangeButton @click="addQuestion" text="+ Add Question"/>
  </ul>
</template>

<script>
import axios from 'axios';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import QuestionPreview from './QuestionPreview.vue';
import { getHeader, getUrl } from '@/services';

export default {
  name: 'QuestionForm',
  data() {
    return {
      questions: []
    }
  },
  methods: {
    setValues(questions) {
      this.questions = questions;
    },
    addQuestion() {
      const headers = getHeader();
      // const url = 'csc/questions/create';
      this.$swal.fire({
        title: "Adding Question...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      const url = getUrl('bb/questions/create');
      axios.post(url, {}, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.questions = [...this.questions, { id: data.id, content: '' }];
          this.$swal.close();
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Add question failed!', 'error');
          // this.questions = [...this.questions, { id: data.id, content: '' }];
        });
    }
  },
  components: { QuestionPreview, OrangeButton }
}
</script>