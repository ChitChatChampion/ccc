<template>
  <router-link :to="abbreviation">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: 'GameModePreview',
  props: {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
      validator: val => val.length <= 3
    },
    imgPath: {
      type: String,
    }
  }
}
</script>