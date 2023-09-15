<template>
  <h1>{{ name }}</h1>
  <description>{{ description }}</description>
  <!-- <img :src="imgPath"/> -->
</template>

<script>
import { gameModeDict } from './gameModes';

export default {
  name: 'ConversationStarterCards',
  data() {
    return {
      name: gameModeDict.csc.name,
      description: gameModeDict.csc.description,
      imgPath: `./${gameModeDict.csc.imgPath}`
    };
  }
}
</script>
