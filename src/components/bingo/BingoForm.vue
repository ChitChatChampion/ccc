<!-- Form for host before creating the room -->

<template>
  <h1 class="font-bold text-3xl text-ne max-w-md my-5">Information</h1>
  <p class="mb-5">What information would you like to get from the players? Remember that these will all be text fields, so feel free to go wild with the details!</p>
  <ul class="bg-light shadow-md rounded-lg md:px-8 px-2 pt-6 pb-8 mb-4 grid gap-5">
    <FieldPreview
      v-for="(field, index) in fields"
      :key="field.id"
      :index="index"
      :id="field.id"
      :content="field.content"/>
    <OrangeButton @click="addField" text="+ Add Field"/>
  </ul>
</template>

<script>
import axios from 'axios';
import OrangeButton from '@/components/buttons/OrangeButton.vue';
import FieldPreview from "./FieldPreview.vue";
import { getHeader, getUrl } from '@/services';

export default {
  name: "BingoForm",
  data() {
    return {
      fields: []
    }
  },
  methods: {
    setValues(fields) {
      this.fields = fields;
    },
    addField() {
      const headers = getHeader();
      const url = getUrl('bingo/fields/create');
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
          this.$swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Field has been added!',
            showConfirmButton: false,
            timer: 1500
          });
          this.fields = [...this.fields, { id: data.id, content: '' }];
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Add field failed!', 'error');
        });
    },
    validate() {
      for (let field of this.fields) {
        if (!field.content) {
          return false;
        }
      }

      return true;
    }
  },
  components: { FieldPreview, OrangeButton }
}
</script>