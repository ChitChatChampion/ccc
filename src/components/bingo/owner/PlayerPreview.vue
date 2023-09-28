<template>
  <div class="bg-ne-light place-content-between p-3 text-light rounded-xl">
    <h2>{{ name }}</h2>
  </div>
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