<template>
  <nav class="flex w-full justify-start h-1/6 place-content-center z-10">
    <router-link :to="backLink" class="text-3xl text-light z-10 grid place-content-center mx-5">
      <v-icon v-if="!!backLink"><font-awesome-icon icon="fa-solid fa-arrow-left"/></v-icon>
    </router-link>
    <div class="font-bold m-auto text-center text-light text-3xl w-screen z-10">
      {{ text }}
    </div>
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
    },
  },
  components: {  }
}
</script>