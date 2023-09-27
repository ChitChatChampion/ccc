<template>
  BingoSquare
</template>

<script>
export default {
  name: "BingoSquare",
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    allNames: {}
  },
  data() {
    return {
      guess: ""
    }
  },
  methods: {
    evaluate() {
      if (this.guess === this.name) {
        return 1;
      }
      return 0;
    }
  }
}
</script>