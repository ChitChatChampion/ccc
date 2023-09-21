<template>
  <li v-if="!hidden">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Question {{ index+1 }}
    </label>
    <div class="flex">
      <input
        v-model="value"
        class="shadow appearance-none border rounded-l-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      <SaveButton :onClick="saveQuestion"/>
      <DeleteButton :onClick="deleteQuestion"/>
    </div>
  </li>
</template>

<script>
import { getHeader, getUrl } from '@/services';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import SaveButton from '@/components/buttons/SaveButton.vue';
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
    text: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.value = this.text;
  },
  components: { DeleteButton, SaveButton },
  methods: {
    saveQuestion() {
      const header = getHeader();
      const url = getUrl('csc/questions/update');
      axios.post(url, { id: this.id, text: this.text }, { header })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.json();
            default:
              throw new Error('Bad method!');
          }
        })
        .then(() => {
          this.$swal.fire('Success!', 'Question has been saved!', 'success');
          this.hidden = true;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Save question failed!', 'error');
        });
    },
    deleteQuestion() {
      const header = getHeader();
      const url = getUrl('csc/questions/delete');
      axios.post(url, { id: this.id }, { header })
        .then(response => {
          switch (response.status) {
            case 200:
              return response.json();
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