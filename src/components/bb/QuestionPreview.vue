<template>
  <li v-if="!hidden">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Question {{ index + 1 }}
    </label>
    <div class="flex">
      <textarea v-model="value"
        class="resize-none shadow appearance-none border rounded-l-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        @blur="saveQuestion"></textarea>
      <DeleteButton :onClick="deleteQuestion" />
    </div>
    <p class="text-ns" v-if="!this.value && isTouched">Question cannot be left blank!</p>
  </li>
</template>

<script>
import { getHeader, getUrl } from '@/services';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import axios from 'axios';
import { googleHelper } from "@/components/loginToGoogle";

export default {
  name: 'QuestionPreview',
  data() {
    return {
      value: '',
      hidden: false,
      isTouched: false
    };
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.value = this.content;
  },
  components: { DeleteButton },
  methods: {
    saveQuestion() {
      googleHelper({ fn: this.saveQuestionProcess, msg: 'save a question' });
    },
    saveQuestionProcess() {
      this.isTouched = true;
      if (!this.value) {
        return;
      }
      const headers = getHeader();
      const url = getUrl(`bb/questions/${this.id}`);
      axios.put(url, { content: this.value }, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Question has been saved!',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Save question failed!', 'error');
        });
    },
    deleteQuestion() {
      googleHelper({ fn: this.deleteQuestionProcess, msg: 'add a question' });
    },
    deleteQuestionProcess() {
      const headers = getHeader();
      const url = getUrl(`bb/questions/${this.id}`);
      axios.delete(url, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
            case 201:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(() => {
          this.$swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Question has been deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.hidden = true;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Delete question failed!', 'error');
        });
    }
  }
}
</script>