<template>
  <button
    type="button"
    @click="onClick"
    class="p-2 bg-cc font-bold text-light rounded-xl hover:bg-cc-light"
  >{{ text }}</button>
</template>

<script>
export default {
  name: 'OrangeButton',
  props: {
    onClick: {},
    text: {
      type: String,
      required: true
    }
  }
}
</script>