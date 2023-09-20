<!-- /bb -->

<template>
  <div class="h-screen bg-gradient-to-b from-ns-light via-ns to-ns-dark z-0">
    <NavBar backLink="/browse" text="Conversation Starter Cards"/>
    <section id="padded" class="mx-10 px-5 grid gap-5">
      <img :src="imgPath" class="x-auto max-h-80 z-10"/>
      <h1 class="text-2xl text-light font-bold z-10">How to play:</h1>
      <p class="text-light z-10">{{ instructions }}</p>
      <PINInput isHorizontal="true"/>
      <div>
        <OrangeButton v-if="isAuthenticated" :onClick="e => this.$router.push('/bb/create')" text="Create Game"/>
        <Login v-else redirect="/bb/create"/>
      </div>
    </section>

    <div class="background-circle-bb bg-ns-light"></div>
    <div class="background-diamond-bb bg-ns-light"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { gameModeDict } from '../gameModes';
import PINInput from '@/components/PINInput.vue';
import Login from '@/components/Login.vue';
import OrangeButton from '@/components/OrangeButton.vue';

export default {
  name: 'BBLanding',
  data() {
    return {
      instructions: gameModeDict.bb.instructions,
      imgPath: gameModeDict.bb.imgPath,
      isAuthenticated: false
    }
  },
  created() {
    if (localStorage.getItem('expiry') > Date.now()) {
      this.isAuthenticated = true;
    }
  },
  components: {
    NavBar,
    PINInput,
    Login,
    OrangeButton
}
}
</script>

<style scoped>
.background-circle-bb {
  position: absolute;
  top: 70%;
  left: 100%;
  transform: translate(-50%, -50%);
  width: 50vh; /* Adjust the size of the circle as needed */
  height: 50vh; /* The width and height should be equal for a circle */
  border-radius: 50%; /* Creates a circle by setting border-radius to 50% */
  z-index: 0; /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-bb {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax; /* Adjust the size of the circle as needed */
  height: 50vmax; /* The width and height should be equal for a circle */
  border-radius: 4rem; /* Creates a circle by setting border-radius to 50% */
  z-index: 0; /* Place the circle behind other content */
  opacity: 20%;
}
</style>
