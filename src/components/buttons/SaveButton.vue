<template>
  <button @click="onClick" class="bg-dt text-light px-2 grid place-content-center hover:bg-dt-light">
    <v-icon><font-awesome-icon icon="fas fa-save"/></v-icon>
  </button>
</template>

<script>
export default {
  name: 'SaveButton',
  props: {
    onClick: {}
  }
}
</script>