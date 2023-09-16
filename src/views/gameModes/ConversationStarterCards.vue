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
  name: 'ConversationStarterCards',
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
  const response = callPost('/csc', fields);
}
</script>