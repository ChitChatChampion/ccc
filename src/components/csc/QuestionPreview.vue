<template>
  <li v-if="!hidden">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Question {{ index+1 }}
    </label>
    <div class="flex">
      <input
        v-model="value"
        class="shadow appearance-none border rounded-l-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        @blur="saveQuestion"/>
      <DeleteButton :onClick="deleteQuestion"/>
    </div>
    <p class="text-ns" v-if="!this.value">Question cannot be left blank!</p>
  </li>
</template>

<script>
import { getHeader, getUrl } from '@/services';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import axios from 'axios';

export default {
  name: 'QuestionPreview',
  data() {
    return {
      value: '',
      hidden: false
    };
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
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
      const headers = getHeader();
      const url = getUrl(`csc/questions/${this.id}`);
      axios.put(url, { content: this.value }, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(() => {
          this.$swal.fire('Success!', 'Question has been saved!', 'success');
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Save question failed!', 'error');
        });
    },
    deleteQuestion() {
      const headers = getHeader();
      const url = getUrl(`csc/questions/${this.id}`);
      axios.delete(url, { headers })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.data;
            default:
              throw new Error('Bad method!');
          }
        })
        .then(() => {
          this.$swal.fire('Success!', 'Question has been deleted!', 'success');
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