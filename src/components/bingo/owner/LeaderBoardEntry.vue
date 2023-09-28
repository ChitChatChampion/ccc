<template>
  <div class="bg-ne-light flex flex-row place-content-between p-3 text-light">
    <h2>{{ name }}</h2>
    <h2 class="w-5 text-center">{{ score }}</h2>
  </div>
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