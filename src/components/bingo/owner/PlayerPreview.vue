<template>
  PlayerPreview
  {{ name }}
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
    name: {
      type: String,
      required: true
    },
    index: {
      type: Number
    }
  }
}
</script>