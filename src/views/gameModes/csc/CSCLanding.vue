<!-- /csc -->

<template>
  <h1>{{ name }}</h1>
  <description>{{ description }}</description>
  <!-- <img :src="imgPath"/> -->
  <FormKit type="form" @submit="createRoom">
    <ContextForm/>
    <CSCForm/>
  </FormKit>
</template>

<script>
import axios from 'axios';
import ContextForm from '@/components/ContextForm.vue';
import CSCForm from '@/components/CSCForm.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';

export default {
  name: 'CSCLanding',
  data() {
    return {
      name: gameModeDict.csc.name,
      description: gameModeDict.csc.description,
      imgPath: `./${gameModeDict.csc.imgPath}`
    };
  },
  components: { ContextForm, CSCForm },
  methods: {
    async createRoom(fields) {
      const url = getUrl('csc');
      const header = getHeader();
      axios.post(url, fields, { header })
        .then(response => {
          switch (response.status) {
            case 201:
              return response.data;
            default:
              this.isInvalid = true;
              this.$swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Something went wrong when creating your room!'
              });
          }
        })
        .then(data => {
          if (!data) return;
          this.$router.push(`csc/${data.id}`);
        })
    }
  }
}
</script>
