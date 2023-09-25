<!-- /bb -->

<template>
  <div class="h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark z-0">
    <NavBar backLink="/browse" />

    <section class="h-2/3 w-screen z-10 grid place-content-center">
      <div class="bg-light rounded-3xl max-w-lg p-5 z-10 grid gap-5 m-10">
        <h1 class="text-3xl font-bold text-ns">Burning Bridges</h1>
        {{ instructions }}
        <PINInput :withBackground="false" :limitWidth="false" />
        <OrangeButton :onClick="e => this.$router.push('/bb/create')" text="Create Game" />
      </div>
    </section>

    <div class="background-circle-bb bg-ns-v-light"></div>
    <div class="background-diamond-bb bg-ns-v-light"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import PINInput from '@/components/inputs/PINInput.vue';
import OrangeButton from '@/components/buttons/OrangeButton.vue';

export default {
  name: 'BBLanding',
  data() {
    return {
      instructions: gameModeDict.bb.instructions,
      imgPath: gameModeDict.bb.imgPath,
    }
  },
  components: {
    NavBar,
    PINInput,
    OrangeButton,
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
