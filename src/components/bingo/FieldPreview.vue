<template>
  <li v-if="!hidden">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      Field {{ index + 1 }}
    </label>
    <div class="flex">
      <input v-model="value"
        class="shadow appearance-none border rounded-l-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="e.g. Gender, Hobbies, Favourite Chocolate"
        @blur="saveField" />
      <DeleteButton :onClick="deleteField" />
    </div>
    <p class="text-ns" v-if="!this.value && isTouched">Cannot be left blank!</p>
  </li>
</template>

<script>
import { getHeader, getUrl } from '@/services';
import DeleteButton from '@/components/buttons/DeleteButton.vue';
import axios from 'axios';

export default {
  name: 'FieldPreview',
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
    saveField() {
      this.isTouched = true;
      if (!this.value) {
        return;
      }
      const headers = getHeader();
      const url = getUrl(`bingo/fields/${this.id}`);
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
            title: 'Field has been saved!',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Save field failed!', 'error');
        });
    },
    deleteField() {
      const headers = getHeader();
      const url = getUrl(`bingo/fields/${this.id}`);
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
            title: 'Field has been deleted!',
            showConfirmButton: false,
            timer: 1500
          });
          this.hidden = true;
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Delete field failed!', 'error');
        });
    }
  }
}
</script>