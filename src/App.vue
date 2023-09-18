<template>
  <!-- <NavBar/> -->
  <!-- <br/>
  <br/> -->
  <router-view/>
</template>

<script>
// import NavBar from './components/NavBar.vue';

export default {
  components: {
    // NavBar
  }
}
</script>

<style lang="scss">

@font-face {
    font-family: "Gilroy";
    font-display: swap;
    font-style: normal;
    src: url("@/fonts/Gilroy-ExtraBold.otf") format("opentype");
}

@font-face {
    font-family: "Metropolis";
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: url("@/fonts/Metropolis-Regular.otf") format("opentype");
}

@font-face {
    font-family: "Metropolis";
    font-weight: 500;
    font-display: swap;
    font-style: normal;
    src: url("@/fonts/Metropolis-Medium.otf") format("opentype");
}

@font-face {
    font-family: "Metropolis";
    font-weight: 600;
    font-display: swap;
    font-style: normal;
    src: url("@/fonts/Metropolis-SemiBold.otf") format("opentype");
}

@font-face {
    font-family: "Metropolis";
    font-weight: 700;
    font-display: swap;
    font-style: normal;
    src: url("@/fonts/Metropolis-Bold.otf") format("opentype");
}

@font-face {
    font-family: "Metropolis";
    font-weight: 800;
    font-display: swap;
    font-style: normal;
    src: url("@/fonts/Metropolis-ExtraBold.otf") format("opentype");
}
</style>