<template>
  <button @click="onClick" class="bg-ns text-light rounded-r-lg px-2 grid place-content-center hover:bg-ns-light">
    <v-icon><font-awesome-icon icon="fas fa-trash"/></v-icon>
  </button>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    onClick: {}
  }
}
</script>