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
import ContextForm from '@/components/ContextForm.vue';
import CSCForm from '@/components/CSCForm.vue';
import { gameModeDict } from './gameModes';
import { callPost } from '@/services';

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
}
</script>

<script setup>
const createRoom = async fields => {
  console.log(fields);
  const url = '/csc';
  const response = callPost(url, fields);
  console.log(response);
}
</script>