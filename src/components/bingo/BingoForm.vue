<!-- Form for host before creating the room -->

<template>
  <h1 class="font-bold text-3xl text-ne max-w-md my-5">Information</h1>
  <ul class="bg-light shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 grid gap-5 max-w-md">
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
          this.fields = [...this.fields, { id: data.id, content: '' }];
        })
        .catch(err => {
          console.log(err);
          this.$swal.fire('Oops...', 'Add field failed!', 'error');
          // this.fields = [...this.fields, { id: data.id, content: '' }];
        });
    }
  },
  components: { FieldPreview, OrangeButton }
}
</script>