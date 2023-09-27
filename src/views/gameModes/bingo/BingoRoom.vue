<!-- /bingo/:id -->

<template>
  <h1>Hi</h1>
</template>

<script>
// import axios from 'axios';

export default {
  name: "BingoRoom",
  created() {
    // const roomId = this.$refs.roomId.value;
    // const url = getUrl(`room/${roomId}`);
    // axios.get()
    this.isOwner = false;
  },
  data() {
    return {
      isOwner: true
    }
  }
}
</script>