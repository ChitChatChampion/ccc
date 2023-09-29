<!-- /* -->

<template>
  <div class="fixed h-screen bg-gradient-to-b from-lrt-light via-lrt to-lrt-dark w-full bg-lrt -z-1"></div>
  <div class="h-screen">
    <div class="h-screen w-screen grid place-content-center">
      <h1 class="text-light z-10 font-bold text-3xl">404: Not Found</h1>
      <router-link :to="{ path: '/' }" class="text-center z-10 text-light underline hover:text-cc">(Go Back)</router-link>
    </div>
    <div class="background-circle-nf bg-lrt-v-light"></div>
    <div class="background-diamond-nf bg-lrt-v-light"></div>
  </div>
</template>

<script>

export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.background-circle-nf {
  position: absolute;
  top: 65%;
  left: 100%;
  transform: translate(-100%, -50%);
  width: 30vh; /* Adjust the size of the circle as needed */
  height: 60vh; /* The width and height should be equal for a circle */
  border-top-left-radius: 60vh;
  border-bottom-left-radius: 60vh;
  z-index: 0; /* Place the circle behind other content */
  opacity: 20%;
}

.background-diamond-nf {
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