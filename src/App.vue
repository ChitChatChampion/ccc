<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ChitChatChampion` : `ChitChatChampion` }}</template>
    <template v-slot:description="{ content }">{{ content || `d` }}</template>
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
      description: 'Elevate your ice-breaker activities with our AI-powered games!'
    })
  }
}
</script>