<template>
  LeaderBoardEntry
  {{ name }}: {{ score }}
</template>

<script>
export default {
  name: "LeaderBoardEntry",
  props: {
    name: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  }
}
</script>