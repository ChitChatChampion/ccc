<!-- /bingo -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ne-light via-ne to-ne-dark w-full bg-ne -z-1"></div>
  <div class="h-screen z-0">
    <NavBar backLink="/browse" text="Social Bingo"/>
    <section class="min-h-[76%] w-screen z-10 grid place-content-center">
      <div class="bg-light rounded-3xl max-w-lg p-5 z-10 grid gap-5 m-5">
        <h1 class="text-3xl font-bold text-ne">How to Play</h1>
        <ol>
          <li><b class="text-ne">Step 1</b>. Have someone <router-link to="bingo/create" class="text-ne underline hover:text-ne-light">create a game</router-link>.</li>
          <li><b class="text-ne">Step 2</b>. Join the game on any device, preferably a phone. This game is best played in person.</li>
          <li><b class="text-ne">Step 3</b>. Fill up the form with whatever fun facts you want to include. Feel free to be as funny and creative as you want, as this will help the AI create an engaging experience!</li>
          <li><b class="text-ne">Step 4</b>. Have the game host start the game.</li>
          <li><b class="text-ne">Step 5</b>. You will see a bingo board with many tiles, each with a description. Go around the room and find out who matches that description.</li>
          <li><b class="text-ne">Step 6</b>. Once you are satisfied with your matching, press the "Submit" button and see how many matchings you got right! Do note that while each tile can be filled up with multiple people, there is only one correct permutation of matchings, all based on how you've filled your forms!</li>
        </ol>
      </div>
      <PINInput/>
    </section>

    <div class="background-circle-bingo bg-ne-v-light"></div>
    <div class="background-diamond-bingo bg-ne-v-light"></div>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import PINInput from '@/components/inputs/PINInput.vue';

export default {
  name: 'BingoLanding',
  setup() {
    useMeta({
      title: 'Social Bingo',
      description: gameModeDict.bingo.description
    })
  },
  data() {
    return {
      instructions: gameModeDict.bingo.instructions,
      imgPath: gameModeDict.bingo.imgPath,
    }
  },
  components: {
    NavBar,
    PINInput,
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
  z-index: 0;
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
  z-index: 0;
  /* Place the circle behind other content */
  opacity: 20%;
}</style>
