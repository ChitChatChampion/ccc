<template>
  <nav class="flex w-full justify-start h-1/6 place-content-center z-10">
    <router-link :to="backLink" class="text-3xl text-light z-10 grid place-content-center mx-5">
      <svg v-if="!!backLink" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill='#FFF' d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
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