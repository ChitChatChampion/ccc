<!-- /bb -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark w-full bg-ns -z-1"></div>
  <div class="h-screen z-0">
    <NavBar backLink="/browse" text="Burning Bridges"/>
    <section class="min-h-[76%] w-screen z-10 grid place-content-center">
      <div class="bg-light rounded-3xl max-w-lg p-5 z-10 grid gap-5 m-5">
        <h1 class="text-3xl font-bold text-ns">How to Play</h1>
        <ol>
          <li><b class="text-ns">Step 1</b>. Have someone <router-link to="bb/create" class="text-ns underline hover:text-ns-light">create a game</router-link>.</li>
          <li><b class="text-ns">Step 2</b>. Join the game on any device, preferably a phone.</li>
          <li><b class="text-ns">Step 3</b>. Sit in a circle and pass the device between players in a clockwise manner.</li>
          <li><b class="text-ns">Step 4</b>. Without revealing to the others, each player should press and hold a button to reveal the card's description.</li>
          <li><b class="text-ns">Step 5</b>. Point to the player who fits the description. The two will then engage in a game of scissors-paper-stone until someone wins.</li>
          <li><b class="text-ns">Step 6</b>. If the player with the device loses, they will have to reveal the description to everyone.</li>
          <li><b class="text-ns">Step 7</b>. Pass the device to the next person and continue at step 4.</li>
        </ol>
      </div>
      <PINInput/>
    </section>

    <div class="background-circle-bb bg-ns-v-light"></div>
    <div class="background-diamond-bb bg-ns-v-light"></div>
  </div>
</template>

<script>
import { useMeta } from 'vue-meta';
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import PINInput from '@/components/inputs/PINInput.vue';

export default {
  name: 'BBLanding',
  setup() {
    useMeta({
      title: 'Burning Bridges',
      description: 'Burning Bridges is an activity that stirs up lively conversations with AI prompts that might even challenge friendships. Dive in and see if your bonds can withstand the heat!'
    })
  },
  data() {
    return {
      instructions: gameModeDict.bb.instructions,
      imgPath: gameModeDict.bb.imgPath,
    }
  },
  components: {
    NavBar,
    PINInput,
  }
}
</script>

<style scoped>
.background-circle-bb {
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

.background-diamond-bb {
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
