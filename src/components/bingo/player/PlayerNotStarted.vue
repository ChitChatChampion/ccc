<template>
  PlayerNotStarted
  <PlayerSubmitted v-if="hasSubmitted"/>
  <PlayerNotSubmitted v-else/>
</template>

<script>
import PlayerNotSubmitted from './PlayerNotSubmitted.vue';
import PlayerSubmitted from './PlayerSubmitted.vue';

export default {
  name: "PlayerNotStarted",
  data() {
    return {
      hasSubmitted: false
    };
  },
  mounted() {
    const roomId = this.$route.params.id;
    this.hasSubmitted = !!localStorage.getItem("hasSubmitted") && !!localStorage.getItem("hasSubmitted")[roomId];
  },
  components: { PlayerSubmitted, PlayerNotSubmitted }
}
</script>