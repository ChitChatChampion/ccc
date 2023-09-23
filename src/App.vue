<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ChitChatChampion` : `ChitChatChampion` }}</template>
  </metainfo>
  <router-view />
</template>

<script>
import { useMeta } from 'vue-meta';

export default {
  name: 'App',
  setup() {
    useMeta({
      title: '',
    })
  }
}
</script>