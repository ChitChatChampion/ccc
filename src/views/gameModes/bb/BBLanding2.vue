<!-- /bb -->

<template>
  <h1>{{ name }}</h1>
  <em>{{ description }}</em>
  <!-- <img :src="imgPath"/> -->
  <FormKit v-if="isAuthenticated" type="form" @submit="createRoom">
    <ContextForm/>
    <BBForm/>
  </FormKit>
  <PINInput v-else/>
</template>

<script>
import axios from 'axios';
import ContextForm from '@/components/ContextForm.vue';
import BBForm from '@/components/BBForm.vue';
import { gameModeDict } from '../gameModes';
import { getHeader, getUrl } from '@/services';
import PINInput from '@/components/PINInput.vue';

export default {
  name: 'BBLanding',
  data() {
    return {
      isAuthenticated: false,
      name: gameModeDict.bb.name,
      description: gameModeDict.bb.description,
      imgPath: `./${gameModeDict.bb.imgPath}`
    };
  },
  created() {
    this.isAuthenticated = localStorage.getItem('expiry') > Date.now();
  },
  components: { ContextForm, BBForm, PINInput },
  methods: {
    async createRoom(fields) {
      const url = getUrl('bb');
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
          this.$router.push(`bb/${data.id}`);
        })
    }
  }
}
</script>
