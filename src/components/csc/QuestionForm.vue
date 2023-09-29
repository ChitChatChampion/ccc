<template>
  <h1 v-if="questions.length" class="font-bold text-3xl text-jr">Questions</h1>
  <p v-if="questions.length" class="mt-5">Are these questions good enough as conversation starters? If not, you can edit or add your own. Make the best ice-breaker activity!</p>
  <ul v-if="questions.length" class="bg-light shadow-md rounded-lg md:px-8 px-2 pt-6 pb-8 mb-4 grid gap-5 mt-5">
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
      const url = getUrl('csc/questions/create');
      axios.post(url, {}, { headers })
        .then(response => {
          console.log(response);
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(data => {
          this.$swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Question has been added!',
            showConfirmButton: false,
            timer: 1500
          });
          this.questions = [...this.questions, { id: data.id, content: '' }];
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Add question failed!', 'error');
        });
    },
    validate() {
      for (let question of this.questions) {
        if (!question.content) {
          return false;
        }
      }

      return true;
    }
  },
  components: { QuestionPreview, OrangeButton }
}
</script>