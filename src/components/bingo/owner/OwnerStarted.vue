<template>
  <div class="w-full">
    <div class="absolute w-full z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <div class="flex gap-2 text-light max-w-sm mx-auto mb-5">
        <span>Room ID:</span>
        <span class="font-bold">{{ this.$route.params.id }}</span>
        <button class="ml-2" @click="copyToClipboard">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path fill="#FFF" d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
        </button>
      </div>
      <LeaderBoard/>
      <BingoBoard :isPlayer="false" class="mt-5"/>
    </div>
  </div>

  <div class="background-circle-bingo bg-ne-v-light"></div>
  <div class="background-diamond-bingo bg-ne-v-light"></div>
</template>

<script>
import BingoBoard from '../board/BingoBoard.vue';
import LeaderBoard from './LeaderBoard.vue';
import useClipboard from "vue-clipboard3"

export default {
  name: "OwnerStarted",
  components: { LeaderBoard, BingoBoard },
  methods: {
    copyToClipboard() {
      const { toClipboard } = useClipboard();
      try {
        toClipboard(this.$route.params.id);
        this.$swal.fire({
          toast: true,
          position: 'bottom',
          icon: 'success',
          title: 'Room ID Copied!',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>
.background-circle-bingo {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh;
  /* Adjust the size of the circle as needed */
  height: 60vh;
  /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-bingo {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax;
  /* Adjust the size of the circle as needed */
  height: 50vmax;
  /* The width and height should be equal for a circle */
  border-radius: 4rem;
  /* Creates a circle by setting border-radius to 50% */
  /* z-index: 0; */
  /* Place the circle behind other content */
  opacity: 20%;
}</style>