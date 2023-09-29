<template>
  <div class="w-full min-h-screen grid place-content-center text-center">
    <div class="absolute w-full h-screen z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
      <NavBar backLink="/bingo" text="Social Bingo"/>
      <div class="h-full grid place-content-center">
        <h1 class="text-light font-bold text-3xl mb-4 grid place-content-center">Refresh when the host has started the game!</h1>
        <p class="text-light">If you are the host, <a class="underline text-cc font-bold hover:text-cc-light" @click="login">sign in here</a>!</p>
      </div>
    </div>
  </div>
  <div class="background-circle-bingo bg-ne-v-light"></div>
  <div class="background-diamond-bingo bg-ne-v-light"></div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import loginToGoogle from "@/components/loginToGoogle";

export default {
  name: "PlayerSubmitted",
  components: { NavBar },
  methods: {
    login() {
      loginToGoogle({});
    },
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