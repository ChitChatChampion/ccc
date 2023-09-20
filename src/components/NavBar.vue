<template>
  <nav class="grid w-full px-5 justify-start h-1/6 place-content-center z-10">
    <router-link :to="backLink" class="text-2xl text-light flex z-10">
      <div class="w-10">
        <v-icon v-if="!!backLink"><font-awesome-icon icon="fa-solid fa-arrow-left"/></v-icon>
      </div>
      <span class="font-bold">{{ text }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBarComponent',
  props: {
    backLink: {
      type: String,
    },
    text: {
      type: String,
    }
  },
  components: {  }
}
</script>