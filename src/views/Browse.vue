<!-- /browse -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-dt-light via-dt to-dt-dark w-full bg-dt -z-1"></div>
  <div class="min-h-screen">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/" text="Chit Chat Champion"/>
      <section id='browse-game-modes' class="md:px-10 px-5 py-10 rounded-t-3xl bg-lrt-background place-content-center mx-auto min-h-[84%] max-w-3xl">
        <h1 class="font-bold text-3xl text-dt pb-10">Game Modes</h1>
        <ul id="game-modes" class="grid md:grid-cols-2 grid-cols-1 gap-5 items-stretch">
          <li v-for="gameMode in gameModes" :key="gameMode.key">
            <GameModePreview v-bind="gameMode"/>
          </li>
        </ul>
      </section>
    </div>
  </div>

  <div class="background-circle bg-dt-v-light"></div>
  <div class="background-diamond bg-dt-v-light"></div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { gameModeList } from './gameModes/gameModes';
import GameModePreview from '@/components/GameModePreview.vue';

export default {
  name: 'BrowseView',
  data() {
    return {
      gameModes: gameModeList
    }
  },
  components: {
    NavBar,
    GameModePreview,
}
}
</script>

<style scoped>
.background-circle {
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

.background-diamond {
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