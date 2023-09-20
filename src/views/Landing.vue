<!-- / -->

<template>
  <div class="h-screen bg-gradient-to-b from-dt-light via-dt to-dt-dark z-0">
  <!-- <div class="h-screen bg-dt"> -->
    <section class="absolute grid gap-5 place-content-center w-full h-full z-10">
      <h1 class="font-bold text-3xl text-light">Chit Chat Champion</h1>
      <PINInput/>
    </section>

    <footer class="absolute bottom-0 p-5 w-full grid place-content-center z-10">
      <p class="font-medium text-light">
        Browse our exciting game modes <router-link to="/browse" class="underline hover:text-cc">here</router-link>!
      </p>
    </footer>

    <div class="background-circle bg-dt-v-light"></div>
    <div class="background-diamond bg-dt-v-light"></div>
  </div>
</template>

<script>
import PINInput from '@/components/PINInput.vue';

export default {
  name: 'LandingView',
  components: {
    PINInput
  }
}
</script>

<style scoped>
.background-circle {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh; /* Adjust the size of the circle as needed */
  height: 60vh; /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  z-index: 0; /* Place the circle behind other content */
  opacity: 10%;
}

.background-diamond {
  position: absolute;
  top: 20%;
  left: 0%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 50vmax; /* Adjust the size of the circle as needed */
  height: 50vmax; /* The width and height should be equal for a circle */
  border-radius: 4rem; /* Creates a circle by setting border-radius to 50% */
  z-index: 0; /* Place the circle behind other content */
  opacity: 10%;
}
</style>